import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Icon from '../Common/Icon';

const Login = (props) => {
  const history = useHistory();
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState();

  const handleChange = (event) => {
    setLoginRequest({
      ...loginRequest,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    setDisabled(true);
    // Prevent default behaviour
    event.preventDefault();
    // Make the login request
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        loginRequest,
        { withCredentials: true },
      );
      props.setIsAuthenticated(true);
      const url = localStorage.getItem('returnUrl') || '/';
      history.push(url);
      localStorage.removeItem('returnUrl');
      //history.push(url);
    } catch (error) {
      setMessage(
        'Incorrect username or password, please check your input and try again.',
      );
      setLoginRequest({ ...loginRequest, password: '' });
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="content mx-5 my-5">
          <h1 className="title is-1">
            <Icon className="fas fa-sign-in-alt" padding />
            Log In
          </h1>
          <p>
            Welcome back! If you are already a member of the site then you can
            log in using your email address and password. Alternatively, you can
            choose the register option above to create a new account.
          </p>

          {message && <div className="notification is-danger">{message}</div>}

          <form onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="username">Email Address</label>
              <input
                type="email"
                className="input is-fullwidth mb-1"
                name="email"
                id="email"
                placeholder="Email Address..."
                value={loginRequest.email}
                onChange={handleChange}
                required
                disabled={disabled}
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="input is-fullwidth mb-1"
                name="password"
                id="password"
                placeholder="Password..."
                value={loginRequest.password}
                onChange={handleChange}
                required
                disabled={disabled}
              />
            </div>

            <button
              className="button is-primary is-fullwidth"
              disabled={disabled}
            >
              <Icon className="fas fa-sign-in-alt" padding />
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
