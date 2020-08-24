import axios from 'axios';

const actionsService = () => {
  const getAll = async (boardid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/actions`,
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

  const create = async (action, boardid) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/actions`,
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
      actionid: action.actionid,
      text: action.text,
      owner: action.owner,
      status: action.status,
      due: action.due,
      updates: action.updates,
      created: action.created,
      closed: action.closed,
      userid: action.userid,
      boardid: action.boardid,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${action.boardid}/actions/${action.actionid}`,
        updatedAction,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardid, actionid) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/actions/${actionid}`,
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
