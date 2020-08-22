import axios from 'axios';

const teamsService = () => {
  const getAll = async () => {
    try {
      const response = await axios.get('/api/teams', { withCredentials: true });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getById = async (teamId) => {
    try {
      const response = await axios.get(`/api/teams/${teamId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const create = async (team) => {
    try {
      const response = await axios.post('/api/teams', team, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const remove = async (teamId) => {
    try {
      await axios.delete(`/api/teams/${teamId}`, { withCredentials: true });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeMembership = async (teamId) => {
    try {
      await axios.delete(`/api/teams/${teamId}/memberships`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const acceptMembership = async (teamId) => {
    try {
      await axios.put(
        `/api/teams/${teamId}/memberships`,
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
      await axios.put(`/api/teams/${teamId}`, team, { withCredentials: true });
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
