import useApi from './useAPI';

const useVotesService = () => {
  const api = useApi();

  const getAll = async (boardid) => {
    return api.get(`/api/boards/${boardid}/votes`);
  };

  const create = async (boardid, cardid, vote) => {
    return api.create(`/api/boards/${boardid}/cards/${cardid}/votes`, vote);
  };

  const remove = async (boardid, cardid, voteid) => {
    return api.remove(`/api/boards/${boardid}/cards/${cardid}/votes/${voteid}`);
  };

  return { getAll, create, remove };
};

export default useVotesService;
