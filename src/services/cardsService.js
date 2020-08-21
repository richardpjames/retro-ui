import axios from 'axios';

const cardsService = () => {
  const getAll = async (boardId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/cards`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (boardId, columnId, card) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns/${columnId}/cards`,
        card,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardId, columnId, cardId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (boardId, columnId, card) => {
    const updatedCard = {
      _id: card._id,
      text: card.text,
      rank: card.rank,
      created: card.created,
      userId: card.userId,
      columnId: card.columnId,
      boardId: card.boardId,
      colour: card.colour,
      combinedCards: card.combinedCards,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}/columns/${columnId}/cards/${card._id}`,
        updatedCard,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, create, remove, update };
};

export default cardsService();
