import useApi from './useAPI';

const useCardsService = () => {
  const api = useApi();

  const getAll = async (boardid) => {
    return api.get(`/api/boards/${boardid}/cards`);
  };

  const create = async (boardid, columnid, card) => {
    return api.create(`/api/boards/${boardid}/columns/${columnid}/cards`, card);
  };

  const remove = async (boardid, columnid, cardid) => {
    return api.remove(
      `/api/boards/${boardid}/columns/${columnid}/cards/${cardid}`,
    );
  };

  const update = async (boardid, columnid, card) => {
    return api.update(
      `/api/boards/${boardid}/columns/${columnid}/cards/${card.cardid}`,
      card,
    );
  };

  const addCombined = async (boardid, columnid, cardid, card) => {
    return api.create(
      `/api/boards/${boardid}/columns/${columnid}/cards/${cardid}/combined`,
      card,
    );
  };

  const updateCombined = async (
    boardid,
    columnid,
    cardid,
    combinedid,
    card,
  ) => {
    return api.update(
      `/api/boards/${boardid}/columns/${columnid}/cards/${cardid}/combined/${combinedid}`,
      card,
    );
  };

  const removeCombined = async (boardid, columnid, cardid, combinedid) => {
    return api.remove(
      `/api/boards/${boardid}/columns/${columnid}/cards/${cardid}/combined/${combinedid}`,
    );
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

export default useCardsService;
