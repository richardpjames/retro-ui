import apiHelper from './apiHelper';

const profileApi = () => {
  const api = apiHelper();

  const get = async () => {
    return api.get(`/api/auth/profile`);
  };

  return { get };
};

export default profileApi;
