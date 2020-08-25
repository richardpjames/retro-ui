// Cookies
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const history = useHistory();

  const logout = (setIsAuthenticated) => {
    // Log out the session
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    setIsAuthenticated(false);
    history.push('/');
  };
  return { logout };
};

export default useAuth;
