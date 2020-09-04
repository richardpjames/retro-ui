import apiHelper from './apiHelper';

const actionApi = () => {
  const api = apiHelper();

  const getAll = async (actionid) => {
    return api.get(`/api/actions/${actionid}/updates`);
  };

  const create = async (actionid, update) => {
    return api.create(`/api/actions/${actionid}/updates`, update);
  };

  const remove = async (actionid, updateid) => {
    return api.remove(`/api/actions/${actionid}/updates/${updateid}`);
  };

  return { getAll, create, remove };
};

export default actionApi;
