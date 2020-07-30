import axios from 'axios';

const teamsService = () => {
  const getAll = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/teams`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getById = async (teamId, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (team, token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/teams`,
        team,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (teamId, token) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/team/${teamId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { getAll, getById, create, remove };
};

export default teamsService();
