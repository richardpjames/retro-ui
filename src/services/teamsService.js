import axios from 'axios';

const teamsService = () => {
  const getAll = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/teams`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getById = async (teamId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (team) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/teams`,
        team,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (teamId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeMembership = async (teamId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}/memberships`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const acceptMembership = async (teamId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}/memberships`,
        { status: 'accepted' },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (teamId, team) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamId}`,
        team,
        { withCredentials: true },
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
