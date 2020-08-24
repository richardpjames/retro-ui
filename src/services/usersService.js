import axios from 'axios';

const usersService = () => {
  const getAll = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getProfile = async (userid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/profile`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const getById = async (userid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/${userid}`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll, getById, getProfile };
};

export default usersService();
