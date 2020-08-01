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
      throw error;
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
      throw error;
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
      throw error;
    }
  };

  const remove = async (teamId, token) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeMembership = async (teamId, token) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}/memberships`,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const acceptMembership = async (teamId, token) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}/memberships`,
        { status: 'accepted' },
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (teamId, team, token) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}`,
        team,
        {
          headers: { Authorization: 'Bearer ' + token },
        },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    getAll,
    getById,
    create,
    remove,
    removeMembership,
    acceptMembership,
    update,
  };
};

export default teamsService();
