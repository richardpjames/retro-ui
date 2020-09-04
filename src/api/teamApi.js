import apiHelper from './apiHelper';

const teamApi = () => {
  const api = apiHelper();

  const getAll = async () => {
    return api.get(`/api/teams`);
  };

  const getById = async (teamid) => {
    return api.get(`/api/teams/${teamid}`);
  };

  const create = async (team) => {
    return api.create(`/api/teams`, team);
  };

  const update = async (team) => {
    return api.update(`/api/teams/${team.teamid}`, team);
  };

  const remove = async (teamid) => {
    return api.remove(`/api/teams/${teamid}`);
  };

  return { getAll, getById, create, remove, update };
};

export default teamApi;
