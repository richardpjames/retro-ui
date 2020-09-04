import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Boards from './Boards/Boards';
import ProfilePage from './Profile/ProfilePage';
import Teams from './Teams/Teams';
import Actions from './Actions/Actions';
import actionTypes from '../../redux/actions/actionTypes';

// Actions required for interaction with redux
import {
  loadBoards,
  createBoard,
  removeBoard,
} from '../../redux/actions/boardActions';
import {
  loadTeams,
  loadTeam,
  createTeam,
  removeTeam,
} from '../../redux/actions/teamActions';
import { loadProfile } from '../../redux/actions/profileActions';
import { loadActions, updateAction } from '../../redux/actions/actionActions';
import {
  createMember,
  removeMember,
  updateMember,
  loadMembers,
} from '../../redux/actions/memberActions';
import TeamDetail from './Teams/TeamDetail';
import io from '../../services/socket';

const Dashboard = (props) => {
  // Get items from props
  const {
    boards,
    teams,
    profile,
    loadBoards,
    loadTeams,
    loadProfile,
    loadActions,
    loadMembers,
    loadTeam,
  } = props;
  // Dashboard state variables
  const [createBoardModalVisible, setCreateBoardModalVisible] = useState(false);

  // A reference to dispatch for the listeners
  const dispatch = useDispatch();

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
        // Load boards from redux
        loadBoards();
        // Load teams from redux
        loadTeams();
        // Load profile from redux
        loadProfile();
        // Load actions from redux
        loadActions();
      } catch (error) {}
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This next one comes after loading teams and profile
  useEffect(() => {
    teams.map((team) => loadMembers(team.teamid));
  }, [loadMembers, teams]);
  // Join the room after retreiving the profile
  useEffect(() => {
    if (profile?.email) {
      // Set up socket connections - first join the room (and reconnect if needed)
      io.emit('join', profile.email);
      io.on('connect', () => {
        io.emit('join', profile.email);
      });

      // Set up each of the listeners for teams
      io.removeAllListeners('team updated');
      io.on('team updated', (team) => {
        dispatch({ type: actionTypes.UPDATE_TEAM, team });
      });
      // Set up each of the listeners for teams
      io.removeAllListeners('team deleted');
      io.on('team deleted', (teamid) => {
        dispatch({ type: actionTypes.REMOVE_TEAM, teamid: parseInt(teamid) });
      });
      // This would imply a membership added - need to load the member and the team
      io.removeAllListeners('member created');
      io.on('member created', (member) => {
        dispatch({ type: actionTypes.CREATE_MEMBER, member });
        loadTeam(member.teamid);
      });
      // This would imply a membership deleted -
      io.removeAllListeners('member deleted');
      io.on('member deleted', (memberid) => {
        dispatch({
          type: actionTypes.REMOVE_MEMBER,
          memberid: parseInt(memberid),
        });
        loadTeams();
      });

      return function cleanup() {
        io.emit('leave', profile.email);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  // Data functions for boards
  const addBoard = async (board) => {
    try {
      // Create the board in redux
      props.createBoard(board);
      // Return a message to the user
      toast.success('Your new board has been created.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  const removeBoard = async (boardid) => {
    try {
      // Remove the board using redux
      props.removeBoard(boardid);
      // Return a message to the user
      toast.success('Your board has been deleted.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  return (
    <>
      <div className="columns mx-0 my-0">
        <div className="column is-one-fifth has-background-grey-dark">
          <Sidebar />
        </div>
        <div className="column mx-0 my-0">
          <Switch>
            <Route path="/dashboard/profile" component={ProfilePage} />
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
                  teams={teams}
                  profile={profile}
                  addBoard={addBoard}
                  removeBoard={removeBoard}
                  createBoardModalVisible={createBoardModalVisible}
                  setCreateBoardModalVisible={setCreateBoardModalVisible}
                />
              )}
            />
            <Route path="/dashboard/teams" exact component={Teams} />
            <Route path="/dashboard/teams/:teamid" component={TeamDetail} />
            <Route path="/dashboard/actions" component={Actions} />
            <Boards
              title="Your Boards"
              boards={boards.filter((board) => board.userid === profile.userid)}
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
    </>
  );
};

// Map items from redux to props
function mapStateToProps(state) {
  return {
    boards: state.boards,
    teams: state.teams,
    profile: state.profile,
    actions: state.actions,
  };
}
// Map our wrapped actions to props
const mapDispatchToProps = {
  loadBoards,
  createBoard,
  removeBoard,
  loadTeams,
  loadTeam,
  createTeam,
  removeTeam,
  loadProfile,
  loadActions,
  updateAction,
  createMember,
  removeMember,
  updateMember,
  loadMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
