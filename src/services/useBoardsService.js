import useApi from './useAPI';

const useBoardsService = () => {
  const api = useApi();

  const getAll = async () => {
    return api.get(`/api/boards`);
  };

  const getById = async (boardid) => {
    return api.get(`/api/boards/${boardid}`);
  };

  const create = async (board) => {
    return api.create(`/api/boards`, board);
  };

  const update = async (board) => {
    return api.update(`/api/boards/${board.boardid}`, board);
  };

  const remove = async (boardid) => {
    return api.remove(`/api/boards/${boardid}`);
  };

  return { getAll, getById, create, remove, update };
};

export default useBoardsService;
