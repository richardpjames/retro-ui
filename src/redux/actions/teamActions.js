// Constants for all action types
import actionTypes from './actionTypes';
// Services for accessing teams from the API
import teamApi from '../../api/teamApi';

// Initialise the teans service
const api = teamApi();

// Loading all teams for the user
export function loadTeams() {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    const teams = await api.getAll();
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.LOAD_TEAMS, teams });
  };
}

// Load a single team by id
export function loadTeam(teamid) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    const team = await api.getById(teamid);
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.LOAD_TEAM, team });
  };
}

// Creating a new team
export function createTeam(team) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    const newTeam = await api.create(team);
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.CREATE_TEAM, team: newTeam });
  };
}

// Creating a new team
export function updateTeam(team) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    const updatedTeam = await api.update(team);
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.UPDATE_TEAM, team: updatedTeam });
  };
}

// Removing a team
export function removeTeam(teamid) {
  return async function (dispatch) {
    api.remove(teamid);
    return dispatch({ type: actionTypes.REMOVE_TEAM, teamid });
  };
}
