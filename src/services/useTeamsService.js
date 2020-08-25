import useApi from './useAPI';

const useTeamsService = () => {
  const api = useApi();

  const getAll = async () => {
    return api.get(`/api/teams`);
  };

  const getById = async (teamid) => {
    return api.get(`${process.env.REACT_APP_API_URL}/api/teams/${teamid}`);
  };

  const create = async (team) => {
    return api.create(`/api/teams`, team);
  };

  const remove = async (teamid) => {
    return api.remove(`/api/teams/${teamid}`);
  };

  const addMembership = async (teamid, member) => {
    return api.create(`/api/teams/${teamid}/memberships`, member);
  };

  const removeMembership = async (teamid, memberid) => {
    return api.remove(`/api/teams/${teamid}/memberships/${memberid}`);
  };

  const acceptMembership = async (teamid, memberid) => {
    const data = { status: 'accepted' };
    return api.update(`/api/teams/${teamid}/memberships/${memberid}`, data);
  };

  const update = async (teamid, team) => {
    return api.update(`/api/teams/${teamid}`, team);
  };

  return {
    getAll,
    getById,
    create,
    remove,
    addMembership,
    removeMembership,
    acceptMembership,
    update,
  };
};

export default useTeamsService;
