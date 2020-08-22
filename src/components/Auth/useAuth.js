// Cookies
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
  const [, , removeAuthCookie] = useCookies(['isAuthenticated']);
  const history = useHistory();

  const logout = (setIsAuthenticated) => {
    setIsAuthenticated(false);
    removeAuthCookie('isAuthenticated', {
      path: '/',
    });
    history.push('/');
  };
  return { logout };
};

export default useAuth;
