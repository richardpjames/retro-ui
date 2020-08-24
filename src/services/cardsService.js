import axios from 'axios';

const cardsService = () => {
  const getAll = async (boardid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/cards`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (boardid, columnid, card) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns/${columnid}/cards`,
        card,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (boardid, columnid, cardid) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns/${columnid}/cards/${cardid}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (boardid, columnid, card) => {
    const updatedCard = {
      cardid: card.cardid,
      text: card.text,
      rank: card.rank,
      created: card.created,
      userid: card.userid,
      columnid: card.columnid,
      boardid: card.boardid,
      colour: card.colour,
      combinedcards: card.combinedcards,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns/${columnid}/cards/${card.cardid}`,
        updatedCard,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const addCombined = async (boardid, columnid, cardid, childCard) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns/${columnid}/cards/${cardid}/combined`,
        childCard,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateCombined = async (
    boardid,
    columnid,
    cardid,
    combinedid,
    card,
  ) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns/${columnid}/cards/${cardid}/combined/${combinedid}`,
        card,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeCombined = async (boardid, columnid, cardid, combinedid) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardid}/columns/${columnid}/cards/${cardid}/combined/${combinedid}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    getAll,
    create,
    remove,
    update,
    addCombined,
    updateCombined,
    removeCombined,
  };
};

export default cardsService();
