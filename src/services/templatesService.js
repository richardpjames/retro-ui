import axios from "axios";

const templatesService = () => {

  const getAll = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/templates`, {
        headers: {'Authorization': 'Bearer ' + token}
      });
      return response.data
    } catch (error) {
      console.log(error);
    }
  }

  return {getAll}

}

export default templatesService();
