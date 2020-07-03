import axios from "axios";

const boardsService = () => {

  const getAll = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/boards`, {
        headers: {'Authorization': 'Bearer ' + token}
      });
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  const create = async (board, token) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/boards`, board, {
        headers: {'Authorization': 'Bearer ' + token}
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const remove = async (boardId, token) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/boards/${boardId}`, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {getAll, create, remove}
}

export default boardsService();