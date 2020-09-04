// Constants for all action types
import actionTypes from './actionTypes';
// Services for accessing actions from the API
import actionApi from '../../api/actionApi';

// Initialise the actions service
const api = actionApi();

// Loading all actions for the user
export function loadActions() {
  return async function (dispatch) {
    const actions = await api.getAll();
    return dispatch({ type: actionTypes.LOAD_ACTIONS, actions });
  };
}

// Update an action
export function updateAction(action) {
  return async function (dispatch) {
    api.update(action);
    return dispatch({ type: actionTypes.UPDATE_ACTION, action });
  };
}
