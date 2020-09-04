import actionTypes from '../actions/actionTypes';

export default function apiCallReducer(state = 0, action) {
  switch (action.type) {
    // On starting a call increment the state
    case actionTypes.BEGIN_API_CALL:
      return state + 1;
    // On ending a call decrement the state
    case actionTypes.END_API_CALL:
      return state - 1;
    // If no actions then return the existing state
    default:
      return state;
  }
}
