import axios from 'axios';

const actionsService = () => {
  const getAll = async (boardId, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/actions`,
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

  const getForUser = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/actions`,
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

  const create = async (action, boardId, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/actions`,
        action,
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

  const update = async (action, token) => {
    const updatedAction = {
      _id: action._id,
      text: action.text,
      owner: action.owner,
      open: action.open,
      due: action.due,
      updates: action.updates,
      created: action.created,
      userId: action.userId,
      boardId: action.boardId,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${action.boardId}/actions/${action._id}`,
        updatedAction,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardId, actionId, token) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/actions/${actionId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, getForUser, create, remove, update };
};

export default actionsService();
