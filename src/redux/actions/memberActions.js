// Constants for all action types
import actionTypes from './actionTypes';
// Services for accessing members from the API
import memberApi from '../../api/memberApi';

// Initialise the members service
const api = memberApi();

// Loading all members for a team
export function loadMembers(teamid) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    const members = await api.getAll(teamid);
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.LOAD_MEMBERS, teamid, members });
  };
}

// Create a new member for a team
export function createMember(teamid, member) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    const newMember = await api.create(teamid, member);
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.CREATE_MEMBER, member: newMember });
  };
}

// Remove a member from a team
export function removeMember(teamid, memberid) {
  return async function (dispatch) {
    api.remove(teamid, memberid);
    return dispatch({ type: actionTypes.REMOVE_MEMBER, teamid, memberid });
  };
}

// Update a member
export function updateMember(teamid, member) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    api.update(teamid, member);
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.UPDATE_MEMBER, member });
  };
}
