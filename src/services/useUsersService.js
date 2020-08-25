import useAPI from './useAPI';

const useUsersService = () => {
  const api = useAPI();

  const getAll = async () => {
    return api.get(`/api/users`);
  };

  const getProfile = async (userid) => {
    return api.get(`/api/auth/profile`);
  };
  const getById = async (userid) => {
    return api.get(`/api/users/${userid}`);
  };

  return { getAll, getById, getProfile };
};

export default useUsersService;
