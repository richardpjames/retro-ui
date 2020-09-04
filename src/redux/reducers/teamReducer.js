import actionTypes from '../actions/actionTypes';

export default function teamReducer(state = [], action) {
  // Take a copy of the state
  let _state = [...state];
  switch (action.type) {
    // On loading teams, replace the teams completely
    case actionTypes.LOAD_TEAMS:
      return action.teams;
    // For loading a single team we remove and reapply
    case actionTypes.LOAD_TEAM:
      _state = _state.filter((team) => team.teamid !== action.team.teamid);
      return [..._state, action.team];
    // On creating a team copy the array and add
    case actionTypes.CREATE_TEAM:
      return [...state, action.team];
    // On updating a team we replace it in the store
    case actionTypes.UPDATE_TEAM:
      // Remove the original team
      _state = _state.filter((_team) => _team.teamid !== action.team.teamid);
      // Return the state with the new team added
      return [..._state, action.team];
    // On deleting a team, filter the existing state
    case actionTypes.REMOVE_TEAM:
      return state.filter((team) => team.teamid !== action.teamid);
    // If no actions then return the existing state
    default:
      return state;
  }
}
