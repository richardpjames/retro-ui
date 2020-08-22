import axios from 'axios';

const templatesService = () => {
  const getAll = async () => {
    try {
      const response = await axios.get('/api/templates', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { getAll };
};

export default templatesService();
