import axios from 'axios';

const columnsService = () => {
  const getAll = async (boardid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (column, boardid) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns`,
        column,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (boardid, column) => {
    const updatedColumn = {
      columnid: column.columnid,
      title: column.title,
      rank: column.rank,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns/${column.columnid}`,
        updatedColumn,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardid, columnid) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns/${columnid}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, create, remove, update };
};

export default columnsService();
