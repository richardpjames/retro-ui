import axios from "axios";

const cardsService = () => {

  const getAll = async (boardId, token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/boards/${boardId}/cards`, {
        headers: {'Authorization': 'Bearer ' + token}
      });
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  const create = async (boardId, card, token) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/boards/${boardId}/cards`, card, {
        headers: {'Authorization': 'Bearer ' + token}
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const remove = async (boardId, cardId, token) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/boards/${boardId}/cards/${cardId}`, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    } catch (error) {
      console.log(error);
    }
  }

  const update = async (boardId, card, token) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/boards/${boardId}/cards/${card.cardId}`, card, {
        headers: {'Authorization': 'Bearer ' + token}
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {getAll, create, remove, update};

}

export default cardsService();
