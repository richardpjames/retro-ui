const apiHelper = () => {
  const handleResponse = (response) => {
    // If denied then we need to log in
    if (response.status === 401) {
      console.log('Login Required');
    }
    // If any other error then go to the error page
    else if (response.status >= 300) {
      console.log('Bad Request');
    } else if (response.status === 200) {
      return response.json();
    }
  };

  const get = async (url) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  };

  const create = async (url, data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
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

export default apiHelper;
