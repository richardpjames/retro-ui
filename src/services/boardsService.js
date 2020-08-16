import axios from 'axios';

const boardsService = () => {
  const getAll = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getById = async (boardId, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (board, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards`,
        board,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (board, token) => {
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
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${board._id}`,
        updatedBoard,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardId, token) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, getById, create, remove, update };
};

export default boardsService();
