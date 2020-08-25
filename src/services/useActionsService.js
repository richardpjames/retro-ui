import useApi from './useAPI';

const useActionsService = () => {
  const api = useApi();
  const getAll = async (boardid) => {
    return api.get(`/api/boards/${boardid}/actions`);
  };

  const getForUser = async () => {
    return api.get(`/api/actions`);
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

  const remove = async (boardid, actionid) => {
    return api.remove(`/api/boards/${boardid}/actions/${actionid}`);
  };

  const addUpdate = async (actionid, update) => {
    return api.create(`/api/actions/${actionid}/updates`, update);
  };

  const removeUpdate = async (actionid, updateid) => {
    return api.remove(`/api/actions/${actionid}/updates/${updateid}`);
  };

  return {
    getAll,
    getForUser,
    create,
    remove,
    update,
    addUpdate,
    removeUpdate,
  };
};

export default useActionsService;
