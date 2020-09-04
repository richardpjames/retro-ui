// Constants for all action types
import actionTypes from './actionTypes';
// Services for accessing boards from the API
import profileApi from '../../api/profileApi';

// Initialise the boards service
const api = profileApi();

// Loading all boards for the user
export function loadProfile() {
  return async function (dispatch) {
    const profile = await api.get();
    return dispatch({ type: actionTypes.LOAD_PROFILE, profile });
  };
}
