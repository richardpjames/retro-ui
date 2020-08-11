import axios from 'axios';

const columnsService = () => {
  const getAll = async (boardId, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns`,
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

  const create = async (column, boardId, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns`,
        column,
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

  const update = async (boardId, column, token) => {
    const updatedColumn = {
      _id: column._id,
      title: column.title,
      order: column.order,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns/${column._id}`,
        updatedColumn,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardId, columnId, token) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns/${columnId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, create, remove, update };
};

export default columnsService();
