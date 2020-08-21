import axios from 'axios';

const actionsService = () => {
  const getAll = async (boardId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/actions`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getForUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/actions`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (action, boardId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/actions`,
        action,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (action) => {
    const updatedAction = {
      _id: action._id,
      text: action.text,
      owner: action.owner,
      status: action.status,
      due: action.due,
      updates: action.updates,
      created: action.created,
      closed: action.closed,
      userId: action.userId,
      boardId: action.boardId,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${action.boardId}/actions/${action._id}`,
        updatedAction,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardId, actionId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/actions/${actionId}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, getForUser, create, remove, update };
};

export default actionsService();
