import axios from 'axios';

const usersService = () => {
  const getAll = async () => {
    try {
      const response = await axios.get('/api/users', { withCredentials: true });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getProfile = async (userId) => {
    try {
      const response = await axios.get('/api/auth/profile', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const getById = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, getById, getProfile };
};

export default usersService();
