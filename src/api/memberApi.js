import apiHelper from './apiHelper';

const memberApi = () => {
  const api = apiHelper();

  const getAll = async (teamid) => {
    return api.get(`/api/teams/${teamid}/members`);
  };

  const getById = async (teamid, memberid) => {
    return api.get(`/api/teams/${teamid}/members/${memberid}`);
  };

  const create = async (teamid, member) => {
    return api.create(`/api/teams/${teamid}/members`, member);
  };

  const update = async (teamid, member) => {
    return api.update(
      `/api/teams/${teamid}/members/${member.memberid}`,
      member,
    );
  };

  const remove = async (teamid, memberid) => {
    return api.remove(`/api/teams/${teamid}/members/${memberid}`);
  };

  return { getAll, getById, create, remove, update };
};

export default memberApi;
