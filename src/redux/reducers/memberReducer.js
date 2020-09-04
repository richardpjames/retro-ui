import actionTypes from '../actions/actionTypes';

export default function memberReducer(state = [], action) {
  // Take a copy of the state
  let _state = [...state];
  switch (action.type) {
    // On loading profile, replace the members for the team
    case actionTypes.LOAD_MEMBERS:
      _state = _state.filter((_member) => _member.teamid !== action.teamid);
      return [..._state, ...action.members];
    // On creation, simply add to the current state
    case actionTypes.CREATE_MEMBER:
      return [..._state, action.member];
    // On updating a member we replace it in the store
    case actionTypes.UPDATE_MEMBER:
      // Remove the original member
      _state = _state.filter(
        (_member) => _member.memberid !== action.member.memberid,
      );
      // Return the state with the new member added
      return [..._state, action.member];
    // For removing, simply filter
    case actionTypes.REMOVE_MEMBER:
      return _state.filter((_member) => _member.memberid !== action.memberid);
    // If a team is deleted then remove the members
    case actionTypes.REMOVE_TEAM:
      return _state.filter((_member) => _member.teamid !== action.teamid);
    // If no actions then return the existing state
    default:
      return state;
  }
}
