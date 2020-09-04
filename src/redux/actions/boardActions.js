// Constants for all action types
import actionTypes from './actionTypes';
// Services for accessing boards from the API
import boardApi from '../../api/boardApi';

// Initialise the boards service
const api = boardApi();

// Loading all boards for the user
export function loadBoards() {
  return async function (dispatch) {
    const boards = await api.getAll();
    return dispatch({ type: actionTypes.LOAD_BOARDS, boards });
  };
}

// Creating a new board
export function createBoard(board) {
  return async function (dispatch) {
    const newBoard = await api.create(board);
    return dispatch({ type: actionTypes.CREATE_BOARD, board: newBoard });
  };
}

// Removing a board
export function removeBoard(boardid) {
  return async function (dispatch) {
    api.remove(boardid);
    return dispatch({ type: actionTypes.REMOVE_BOARD, boardid });
  };
}
