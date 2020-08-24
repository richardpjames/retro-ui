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

  const getById = async (teamid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamid}`,
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

  const remove = async (teamid) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamid}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const addMembership = async (teamid, member) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamid}/memberships`,
        member,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeMembership = async (teamid, memberid) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamid}/memberships/${memberid}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const acceptMembership = async (teamid, memberid) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamid}/memberships/${memberid}`,
        { status: 'accepted' },
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const update = async (teamid, team) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/teams/${teamid}`,
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
    addMembership,
    removeMembership,
    acceptMembership,
    update,
  };
};

export default teamsService();
