// For redirecting on errors
const { useHistory } = require('react-router-dom');

const useApi = () => {
  const history = useHistory();

  const handleResponse = (response) => {
    // If denied then we need to log in
    if (response.status === 401) {
      localStorage.setItem('returnUrl', window.location.pathname);
      history.push('/auth/login');
      throw new Error('Login Required');
    }
    // If any other error then go to the error page
    else if (response.status >= 300) {
      history.push(`/error/${response.status}`);
      throw new Error('Bad Request');
    } else {
      return response.json();
    }
  };

  const get = async (url) => {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  };

  const create = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  };

  const update = async (url, data) => {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  };

  const remove = async (url) => {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  };

  return { get, create, update, remove };
};

export default useApi;
