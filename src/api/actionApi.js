import apiHelper from './apiHelper';

const actionApi = () => {
  const api = apiHelper();

  const getAll = async () => {
    return api.get(`/api/actions`);
  };

  const getForBoard = async (boardid) => {
    return api.get(`/api/boards/${boardid}/actions`);
  };

  const create = async (action, boardid) => {
    return api.create(`/api/boards/${boardid}/actions`, action);
  };

  const update = async (action) => {
    return api.update(
      `/api/boards/${action.boardid}/actions/${action.actionid}`,
      action,
    );
  };

  return { getAll, getForBoard, create, update };
};

export default actionApi;
