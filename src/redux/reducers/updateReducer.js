import actionTypes from '../actions/actionTypes';

export default function memberReducer(state = [], action) {
  // Take a copy of the state
  let _state = [...state];
  switch (action.type) {
    // On loading replace for the action
    case actionTypes.LOAD_UPDATES:
      _state = _state.filter((_update) => _update.actionid !== action.actionid);
      return [..._state, ...action.updates];
    // On creation, simply add to the current state
    case actionTypes.CREATE_UPDATE:
      return [..._state, action.update];
    // For removing, simply filter
    case actionTypes.REMOVE_UPDATE:
      return _state.filter((_update) => _update.updateid !== action.updateid);
    // If an action is deleted then remove the updates
    case actionTypes.REMOVE_ACTION:
      return _state.filter((_update) => _update.actionid !== action.actionid);
    // If no actions then return the existing state
    default:
      return state;
  }
}
