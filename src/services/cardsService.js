import axios from 'axios';

const cardsService = () => {
  const getAll = async (boardId, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/cards`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (boardId, columnId, card, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns/${columnId}/cards`,
        card,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (boardId, columnId, cardId, token) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (boardId, columnId, card, token) => {
    const updatedCard = {
      _id: card._id,
      text: card.text,
      rank: card.rank,
      created: card.created,
      userId: card.userId,
      columnId: card.columnId,
      boardId: card.boardId,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns/${columnId}/cards/${card._id}`,
        updatedCard,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { getAll, create, remove, update };
};

export default cardsService();
