import boardsService from '../../../services/boardsService';

const useBoardsController = (board, setBoard) => {
  const updateBoard = async (board) => {
    // Get the access token for calling the service
    // Call the service
    boardsService.update(board);
    // Update local state
    setBoard(board);
  };

  return { updateBoard };
};

export default useBoardsController;
