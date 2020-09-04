import actionTypes from '../actions/actionTypes';

export default function actionReducer(state = [], action) {
  switch (action.type) {
    // On loading actions, replace the state completely
    case actionTypes.LOAD_ACTIONS:
      return action.actions;
    // On updating an action we replace it in the store
    case actionTypes.UPDATE_ACTION:
      let _state = [...state];
      // Remove the original action
      _state = _state.filter(
        (_action) => _action.actionid !== action.action.actionid,
      );
      // Return the state with the new action added
      return [..._state, action.action];
    // If no actions then return the existing state
    default:
      return state;
  }
}
