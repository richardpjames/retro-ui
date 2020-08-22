import axios from 'axios';

const votesService = () => {
  const getAll = async (boardId) => {
    try {
      const response = await axios.get(`/api/boards/${boardId}/votes`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (boardId, cardId, vote) => {
    try {
      const response = await axios.post(
        `/api/boards/${boardId}/cards/${cardId}/votes`,
        vote,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardId, cardId, voteId) => {
    try {
      await axios.delete(
        `/api/boards/${boardId}/cards/${cardId}/votes/${voteId}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, create, remove };
};

export default votesService();
