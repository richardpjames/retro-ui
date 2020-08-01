import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Boards from './Boards/Boards';
import ProfilePage from './Profile/ProfilePage';
import Teams from './Teams/Teams';
import boardsService from '../../services/boardsService';
import teamsService from '../../services/teamsService';
import usersService from '../../services/usersService';
import LoadingSpinner from '../Common/LoadingSpinner';

const Dashboard = () => {
  // Dashboard state variables
  const { getAccessTokenSilently, user } = useAuth0();
  const [boards, setBoards] = useState([]);
  const [totalBoards, setTotalBoards] = useState(5);
  const [teams, setTeams] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [createBoardModalVisible, setCreateBoardModalVisible] = useState(false);
  const [createTeamModalVisible, setCreateTeamModalVisible] = useState(false);
  const [pendingTeams, setPendingTeams] = useState(0);
  const Paddle = window.Paddle;

  // Loading of all initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get the access token required to call the API
        const token = await getAccessTokenSilently();
        // Call the API
        const boards = await boardsService.getAll(token);
        // Update the boards
        if (boards) {
          // Sort the boards
          const _boards = boards.sort((a, b) => {
            if (a.created < b.created) return 1;
            return -1;
          });
          setBoards(_boards);
        }
        // Get any teams
        const teams = await teamsService.getAll(token);
        // Update the teams
        if (teams) {
          // Sort the teams
          const _teams = teams.sort((a, b) => {
            if (a.name > b.name) return 1;
            return -1;
          });
          setTeams(_teams);
        }
        // Get the user profile
        const profile = await usersService.getById(user.sub, token);
        setProfile(profile);
        // Set the total number of boards for the user
        setTotalBoards(
          boards.filter((board) => board.userId === profile.id).length,
        );
        // Set the number of teams with pending invitation
        setPendingTeams(0);
        // Stop loading bar
        setLoading(false);
      } catch (error) {
        // For now just log any errors - TODO: Improve error handling
        console.log(error);
        toast.error(error);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, user]);

  // Data functions for boards
  const addBoard = async (board) => {
    try {
      // Get the access token required to call the API
      const token = await getAccessTokenSilently();
      const newBoard = await boardsService.create(board, token);
      // Add the new board returned to the existing list
      setBoards([newBoard, ...boards]);
      // Set the total number of boards for the user
      setTotalBoards(totalBoards + 1);
      // Show confirmation to the user
      toast.success('Your new board has been created.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  const removeBoard = async (boardId) => {
    try {
      // Get the access token and call the delete endpoint
      const token = await getAccessTokenSilently();
      await boardsService.remove(boardId, token);
      // Remove the board from the state
      let updatedBoards = boards.filter((board) => {
        return board._id !== boardId;
      });
      setBoards(updatedBoards);
      // Set the total number of boards for the user
      setTotalBoards(totalBoards - 1);
      toast.success('Your board has been deleted.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  // Data functions for teams
  const addTeam = async (team) => {
    try {
      // Get the access token required to call the API
      const token = await getAccessTokenSilently();
      const newTeam = await teamsService.create(team, token);
      // Add to the list and sort
      let _teams = [newTeam, ...teams];
      _teams = _teams.sort((a, b) => {
        if (a.name > b.name) return 1;
        return -1;
      });
      // Add the new board returned to the existing list
      setTeams(_teams);
      // Show confirmation to the user
      toast.success('Your new team has been created.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  const addTeamMember = async (teamId, emailAddress) => {
    // Find the team to update
    const _teams = [...teams];
    const _team = _teams.find((team) => team._id === teamId);
    if (!_team.members) {
      _team.members = [];
    }
    // Check that the email address is not already in the list
    const check = _team.members.find((member) => member.email === emailAddress);
    if (check) {
      toast.error('This person is already a member of the team');
      // If not, then add them
    } else {
      _team.members.push({ email: emailAddress, status: 'invited' });
      try {
        // Get the token required for the API call
        const token = await getAccessTokenSilently();
        // Update the team
        await teamsService.update(teamId, _team, token);
        // Post a sucucess message
        toast.success('Your new team member has been added');
        setTeams(_teams);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const removeTeamMember = async (teamId, emailAddress) => {
    //Find the team to update
    const _teams = [...teams];
    const _team = _teams.find((team) => team._id === teamId);
    _team.members = _team.members.filter(
      (member) => member.email !== emailAddress,
    );
    try {
      // Get the token required for the API call
      const token = await getAccessTokenSilently();
      // Update the team
      await teamsService.update(teamId, _team, token);
      // Post a sucucess message
      toast.success('Your team member has been removed');
      setTeams(_teams);
    } catch (error) {
      toast.error(error);
    }
  };

  const removeMembership = async (teamId) => {
    try {
      // Remove using the API
      const token = await getAccessTokenSilently();
      await teamsService.removeMembership(teamId, token);
      // Now remove the team from local list
      let _teams = [...teams];
      _teams = _teams.filter((team) => team._id !== teamId);
      // Update the state
      setTeams(_teams);
      toast.success('You have left the team');
    } catch (error) {
      toast.error(error);
    }
  };

  const acceptMembership = async (teamId) => {
    try {
      // Get the token for the API
      const token = await getAccessTokenSilently();
      // Accept membership
      await teamsService.acceptMembership(teamId, token);
      // Now update the team
      let _teams = [...teams];
      const _team = _teams.find((team) => team._id === teamId);
      const _membership = _team.members.find(
        (member) => member.email === profile.email,
      );
      _membership.status = 'accepted';
      // Update the state
      setTeams(_teams);
      toast.success('You have accepted the invitation');
    } catch (error) {
      toast.error(error);
    }
  };

  const removeTeam = async (teamId) => {
    try {
      setLoading(true);
      // Get the access token and call the delete endpoint
      const token = await getAccessTokenSilently();
      await teamsService.remove(teamId, token);
      // Remove the board from the state
      let updatedTeams = teams.filter((team) => {
        return team._id !== teamId;
      });
      setTeams(updatedTeams);
      setLoading(false);
      toast.success('Your team has been deleted.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  return (
    <div className="columns">
      {loading ? <LoadingSpinner /> : null}
      <div className="column is-one-fifth">
        <Sidebar teams={teams} profile={profile} pendingTeams={pendingTeams} />
      </div>
      <div className="column">
        <Switch>
          <Route
            path="/dashboard/profile"
            render={(props) => (
              <ProfilePage {...props} paddle={Paddle} profile={profile} />
            )}
          />
          <Route
            path="/dashboard/boards"
            exact
            render={(props) => (
              <Boards
                title="Your Boards"
                {...props}
                boards={boards.filter((board) => board.userId === profile.id)}
                totalBoards={totalBoards}
                teams={teams}
                profile={profile}
                addBoard={addBoard}
                removeBoard={removeBoard}
                createBoardModalVisible={createBoardModalVisible}
                setCreateBoardModalVisible={setCreateBoardModalVisible}
              />
            )}
          />
          <Route
            path="/dashboard/boards/all"
            exact
            render={(props) => (
              <Boards
                title="All Boards"
                {...props}
                boards={boards}
                totalBoards={totalBoards}
                teams={teams}
                profile={profile}
                addBoard={addBoard}
                removeBoard={removeBoard}
                createBoardModalVisible={createBoardModalVisible}
                setCreateBoardModalVisible={setCreateBoardModalVisible}
              />
            )}
          />
          <Route
            path="/dashboard/boards/:teamId"
            render={(props) => (
              <Boards
                title={
                  teams.find((team) => team._id === props.match.params.teamId)
                    ? `${
                        teams.find(
                          (team) => team._id === props.match.params.teamId,
                        ).name
                      } Boards`
                    : null
                }
                {...props}
                boards={boards.filter(
                  (board) => board.teamId === props.match.params.teamId,
                )}
                totalBoards={totalBoards}
                teams={teams}
                profile={profile}
                addBoard={addBoard}
                removeBoard={removeBoard}
                createBoardModalVisible={createBoardModalVisible}
                setCreateBoardModalVisible={setCreateBoardModalVisible}
              />
            )}
          />
          <Route
            path="/dashboard/teams"
            render={(props) => (
              <Teams
                teams={teams}
                profile={profile}
                addTeam={addTeam}
                addTeamMember={addTeamMember}
                acceptMembership={acceptMembership}
                removeTeam={removeTeam}
                removeTeamMember={removeTeamMember}
                removeMembership={removeMembership}
                createTeamModalVisible={createTeamModalVisible}
                setCreateTeamModalVisible={setCreateTeamModalVisible}
              />
            )}
          />
          <Boards
            title="Your Boards"
            boards={boards.filter((board) => board.userId === profile.id)}
            totalBoards={totalBoards}
            profile={profile}
            teams={teams}
            addBoard={addBoard}
            removeBoard={removeBoard}
            createBoardModalVisible={createBoardModalVisible}
            setCreateBoardModalVisible={setCreateBoardModalVisible}
          />
        </Switch>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Dashboard);
