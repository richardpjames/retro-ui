import actionTypes from '../actions/actionTypes';

export default function profileReducer(state = [], action) {
  switch (action.type) {
    // On loading profile, replace the state completely
    case actionTypes.LOAD_PROFILE:
      return action.profile;
    // If no actions then return the existing state
    default:
      return state;
  }
}
