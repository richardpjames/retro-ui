import useBoardsService from '../../../services/useBoardsService';

const useBoardsController = (data) => {
  const boardsService = useBoardsService();

  const updateBoard = async (board) => {
    // Get the access token for calling the service
    // Call the service
    boardsService.update(board);
    // Update local state
    data.setBoard(board);
  };

  return { updateBoard };
};

export default useBoardsController;
