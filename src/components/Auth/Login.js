import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Icon from '../Common/Icon';

const Login = (props) => {
  const history = useHistory();
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState();

  const handleChange = (event) => {
    setLoginRequest({
      ...loginRequest,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
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
    }
  };

  return (
    <>
      <h1 className="title is-1">Login</h1>

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
          />
        </div>

        <button className="button is-primary is-fullwidth">
          <Icon class="fas fa-sign-in-alt" padding />
          Log In
        </button>
      </form>
      <Link to="/auth/forgotten">
        <button className="button is-fullwidth is-size-7 mt-1">
          <Icon class="fas fa-unlock-alt" padding />
          Forgotten your Password?
        </button>
      </Link>
    </>
  );
};

export default Login;
