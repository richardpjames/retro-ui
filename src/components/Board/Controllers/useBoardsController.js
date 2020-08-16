import { useAuth0 } from '@auth0/auth0-react';
import boardsService from '../../../services/boardsService';

const useBoardsController = (board, setBoard) => {
  const { getAccessTokenSilently } = useAuth0();

  const updateBoard = async (board) => {
    // Get the access token for calling the service
    const token = await getAccessTokenSilently();
    // Call the service
    boardsService.update(board, token);
    // Update local state
    setBoard(board);
  };

  return { updateBoard };
};

export default useBoardsController;
