// Constants for all action types
import actionTypes from './actionTypes';
// Services for accessing members from the API
import updateApi from '../../api/updateApi';

// Initialise the updates service
const api = updateApi();

// Load all updates for an action
export function loadUpdates(actionid) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    const updates = await api.getAll(actionid);
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.LOAD_UPDATES, actionid, updates });
  };
}

// Create a new update for an action
export function createUpdate(actionid, update) {
  return async function (dispatch) {
    dispatch({ type: actionTypes.BEGIN_API_CALL });
    const newUpdate = await api.create(actionid, update);
    dispatch({ type: actionTypes.END_API_CALL });
    return dispatch({ type: actionTypes.CREATE_UPDATE, update: newUpdate });
  };
}

// Remove an update for an action
export function removeUpdate(actionid, updateid) {
  return async function (dispatch) {
    api.remove(actionid, updateid);
    return dispatch({ type: actionTypes.REMOVE_UPDATE, actionid, updateid });
  };
}
