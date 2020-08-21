import axios from 'axios';

const boardsService = () => {
  const getAll = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getById = async (boardId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (board) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards`,
        board,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (board) => {
    const updatedBoard = {
      _id: board._id,
      name: board.name,
      description: board.description,
      maxVotes: board.maxVotes,
      created: board.created,
      userId: board.userId,
      teamId: board.teamId,
      private: board.private,
      showActions: board.showActions,
      allowVotes: board.allowVotes,
      locked: board.locked,
      instructions: board.instructions,
      showInstructions: board.showInstructions,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${board._id}`,
        updatedBoard,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, getById, create, remove, update };
};

export default boardsService();
