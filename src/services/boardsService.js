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
      boardid: board.boardid,
      name: board.name,
      description: board.description,
      maxvotes: board.maxvotes,
      created: board.created,
      userId: board.userid,
      teamId: board.teamid,
      private: board.private,
      showactions: board.showactions,
      allowvotes: board.allowvotes,
      locked: board.locked,
      instructions: board.instructions,
      showinstructions: board.showinstructions,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${board.boardid}`,
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
