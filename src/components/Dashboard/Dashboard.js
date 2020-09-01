import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Boards from './Boards/Boards';
import ProfilePage from './Profile/ProfilePage';
import Teams from './Teams/Teams';
import LoadingSpinner from '../Common/LoadingSpinner';
import Actions from './Actions/Actions';
import useBoardsService from '../../services/useBoardsService';
import useTeamsService from '../../services/useTeamsService';
import useUsersService from '../../services/useUsersService';
import useActionsService from '../../services/useActionsService';

const Dashboard = (props) => {
  // Dashboard state variables
  const [boards, setBoards] = useState([]);
  const [totalBoards, setTotalBoards] = useState(5);
  const [teams, setTeams] = useState([]);
  const [actions, setActions] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [createBoardModalVisible, setCreateBoardModalVisible] = useState(false);
  const [createTeamModalVisible, setCreateTeamModalVisible] = useState(false);
  const [leaveTeamModalVisible, setLeaveTeamModalVisible] = useState(false);
  const [teamToLeave, setTeamToLeave] = useState({});
  const [
    removeTeamMemberModalVisible,
    setRemoveTeamMemberModalVisible,
  ] = useState(false);
  const [teamMemberToRemove, setTeamMemberToRemove] = useState({});
  const [pendingTeams, setPendingTeams] = useState(0);

  // Services for reading data
  const boardsService = useBoardsService();
  const teamsService = useTeamsService();
  const usersService = useUsersService();
  const actionsService = useActionsService();

  document.title = 'RetroSpectacle - Dashboard';
  document
    .querySelector('meta[name="description"]')
    .setAttribute(
      'content',
      'The RetroSpectacle user dashboard. Control boards, actions and teams.',
    );

  // Loading of all initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Call the API
        const boards = await boardsService.getAll();
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
        const teams = await teamsService.getAll();
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
        const profile = await usersService.getProfile();
        setProfile(profile);
        // Get the user actions
        const actions = await actionsService.getForUser();
        // Sort them into order
        let _actions = actions.sort((a, b) => {
          if (a.due > b.due) {
            return 1;
          } else if (a.due === b.due) {
            if (a.actionid > b.actionid) {
              return 1;
            }
            return -1;
          }
          return -1;
        });
        setActions(_actions);
        // Set the total number of boards for the user
        setTotalBoards(0);
        // Set the number of teams with pending invitation
        calculatePendingTeams(teams, profile);

        // Stop loading bar
        setLoading(false);
      } catch (error) {}
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Data functions for boards
  const addBoard = async (board) => {
    try {
      // Get the access token required to call the API
      const newBoard = await boardsService.create(board);
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

  const removeBoard = async (boardid) => {
    try {
      // Get the access token and call the delete endpoint
      boardsService.remove(boardid);
      // Remove the board from the state
      let updatedBoards = boards.filter((board) => board.boardid !== boardid);
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
  const calculatePendingTeams = (_teams, _profile) => {
    let _counter = 0;
    _teams.map((team) => {
      if (team.members) {
        team.members.map((member) => {
          if (member.email === _profile.email && member.status === 'invited') {
            _counter += 1;
          }
          return true;
        });
      }
      return true;
    });
    setPendingTeams(_counter);
  };

  const addTeam = async (team) => {
    try {
      // Get the access token required to call the API
      const newTeam = await teamsService.create(team);
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

  const addTeamMember = async (teamid, emailAddress) => {
    // Find the team to update
    const _teams = [...teams];
    const _team = _teams.find((team) => team.teamid === teamid);
    if (!_team.members) {
      _team.members = [];
    }
    // Check that the email address is not already in the list
    const check = _team.members.find((member) => member.email === emailAddress);
    if (check) {
      toast.error('This person is already a member of the team');
      // If not, then add them
    } else {
      try {
        // Update the team
        const newMember = await teamsService.addMembership(teamid, {
          email: emailAddress,
          status: 'invited',
        });
        _team.members.push(newMember);

        // Post a sucucess message
        toast.success('Your new team member has been added');
        setTeams(_teams);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const removeTeamMember = async (teamid, memberid) => {
    //Find the team to update
    const _teams = [...teams];
    const _team = _teams.find((team) => team.teamid === teamid);
    _team.members = _team.members.filter(
      (member) => member.memberid !== memberid,
    );
    try {
      // Update the team
      await teamsService.removeMembership(teamid, memberid);
      // Post a sucucess message
      toast.success('Your team member has been removed');
      setTeams(_teams);
    } catch (error) {
      toast.error(error);
    }
  };

  const removeMembership = async (teamid, memberid) => {
    try {
      // Remove using the API
      await teamsService.removeMembership(teamid, memberid);
      // Now remove the team from local list
      let _teams = [...teams];
      _teams = _teams.filter((team) => team.teamid !== teamid);
      // Update the state
      setTeams(_teams);
      calculatePendingTeams(_teams, profile);
      toast.success('You have left the team');
    } catch (error) {
      toast.error(error);
    }
  };

  const acceptMembership = async (teamid, memberid) => {
    try {
      // Accept membership
      await teamsService.acceptMembership(teamid, memberid);
      // Now update the team
      let _teams = [...teams];
      const _team = _teams.find((team) => team.teamid === teamid);
      const _membership = _team.members.find(
        (member) => member.email === profile.email,
      );
      _membership.status = 'accepted';
      // Update the state
      setTeams(_teams);
      calculatePendingTeams(_teams, profile);
      toast.success('You have accepted the invitation');
    } catch (error) {
      toast.error(error);
    }
  };

  const removeTeam = async (teamid) => {
    try {
      setLoading(true);
      // Get the access token and call the delete endpoint
      teamsService.remove(teamid);
      // Remove the board from the state
      let updatedTeams = teams.filter((team) => {
        return team.teamid !== teamid;
      });
      setTeams(updatedTeams);
      // Also remove boards belonging to the team
      let _boards = [...boards];
      _boards = _boards.filter((board) => board.teamid !== teamid);
      setBoards(_boards);
      // Stop loading
      setLoading(false);
      toast.success('Your team has been deleted.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  const updateAction = async (action) => {
    // Get the token for updating the service
    // Update the action within the UI
    let _actions = [...actions];
    _actions
      .filter((a) => a.actionid === action.actionid)
      .map(async (a) => (a.status = action.status));
    setActions(_actions);
    actionsService.update(action);
  };

  const addActionUpdate = async (actionid, update) => {
    // Make the update to the server
    const newUpdate = await actionsService.addUpdate(actionid, update);
    let _actions = [...actions];
    _actions
      .filter((a) => a.actionid === newUpdate.actionid)
      .map((a) => {
        a.updates.push({ ...newUpdate, nickname: profile.nickname });
        return a;
      });
    setActions(_actions);
  };

  const removeActionUpdate = async (actionid, updateid) => {
    // Remove the update from the action
    let _actions = [...actions];
    _actions
      .filter((a) => a.actionid === actionid)
      .map((a) => {
        let _updates = [...a.updates];
        _updates = _updates.filter((u) => u.updateid !== updateid);
        a.updates = _updates;
        return a;
      });
    // Make the update to the server
    actionsService.removeUpdate(actionid, updateid);
  };

  return (
    <>
      {props.isAuthenticated && (
        <div className="columns mx-0 my-0">
          {loading ? <LoadingSpinner /> : null}
          <div className="column is-narrow has-background-grey-dark ">
            <Sidebar
              teams={teams}
              profile={profile}
              pendingTeams={pendingTeams}
            />
          </div>
          <div className="column mx-0 my-0">
            <Switch>
              <Route
                path="/dashboard/profile"
                render={(props) => <ProfilePage {...props} profile={profile} />}
              />
              <Route
                path="/dashboard/boards"
                exact
                render={(props) => (
                  <Boards
                    title="Your Boards"
                    {...props}
                    boards={boards.filter(
                      (board) => board.userid === profile.userid,
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
                path="/dashboard/boards/:teamid"
                render={(props) => (
                  <Boards
                    title={
                      teams.find(
                        (team) =>
                          team.teamid === parseInt(props.match.params.teamid),
                      )
                        ? `${
                            teams.find(
                              (team) =>
                                team.teamid ===
                                parseInt(props.match.params.teamid),
                            ).name
                          } Boards`
                        : null
                    }
                    {...props}
                    boards={boards.filter(
                      (board) =>
                        board.teamid === parseInt(props.match.params.teamid),
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
                    leaveTeamModalVisible={leaveTeamModalVisible}
                    setLeaveTeamModalVisible={setLeaveTeamModalVisible}
                    teamToLeave={teamToLeave}
                    setTeamToLeave={setTeamToLeave}
                    removeTeamMemberModalVisible={removeTeamMemberModalVisible}
                    setRemoveTeamMemberModalVisible={
                      setRemoveTeamMemberModalVisible
                    }
                    teamMemberToRemove={teamMemberToRemove}
                    setTeamMemberToRemove={setTeamMemberToRemove}
                    pendingTeams={pendingTeams}
                  />
                )}
              />
              <Route
                path="/dashboard/actions"
                render={(props) => (
                  <Actions
                    actions={actions}
                    updateAction={updateAction}
                    addActionUpdate={addActionUpdate}
                    removeActionUpdate={removeActionUpdate}
                    profile={profile}
                  />
                )}
              />
              <Boards
                title="Your Boards"
                boards={boards.filter(
                  (board) => board.userid === profile.userid,
                )}
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
      )}
    </>
  );
};

export default Dashboard;
