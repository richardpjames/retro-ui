import actionTypes from '../actions/actionTypes';

export default function boardReducer(state = [], action) {
  switch (action.type) {
    // On loading boards, replace the boards completely
    case actionTypes.LOAD_BOARDS:
      return action.boards;
    // On creating a board copy the array and add
    case actionTypes.CREATE_BOARD:
      return [...state, action.board];
    // On deleting a board, filter the existing state
    case actionTypes.REMOVE_BOARD:
      return state.filter((board) => board.boardid !== action.boardid);
    // If no actions then return the existing state
    default:
      return state;
  }
}
