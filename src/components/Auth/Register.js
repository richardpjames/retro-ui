import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Icon from '../Common/Icon';

const Register = (props) => {
  const history = useHistory();
  const [registrationRequest, setRegistrationRequest] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [message, setMessage] = useState();

  document.title = 'RetroSpectacle - Login';
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', 'The RetroSpectacle Login Page');

  const handleChange = (event) => {
    setRegistrationRequest({
      ...registrationRequest,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegistration = async (event) => {
    // Prevent default behaviour
    event.preventDefault();
    if (registrationRequest.password === registrationRequest.confirmPassword) {
      // Make the registration request
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/signup`,
          registrationRequest,
        );
        // If no errors then log in
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          registrationRequest,
          { withCredentials: true },
        );
        // Fire the google conversion tag
        const gtag = window.gtag;
        gtag('event', 'conversion', {
          send_to: 'AW-806522976/mwTyCOCH_dsBEOCgyoAD',
        });
        // Set the application state
        props.setIsAuthenticated(true);
        // Redirect to the returnUrl or the homepage
        history.push(localStorage.getItem('returnUrl') || '/');
        return true;
      } catch (error) {
        setMessage(
          'It looks like that email address has already been used. Please try logging in or resetting your password.',
        );
      }
    } else {
      setMessage('Passwords do not match.');
    }
    setRegistrationRequest({
      ...registrationRequest,
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <h1 className="title is-1">Register</h1>

      {message && <div className="notification is-danger">{message}</div>}

      <form onSubmit={handleRegistration}>
        <div className="field">
          <label htmlFor="username">Email Address</label>
          <input
            type="email"
            className="input is-fullwidth mb-1"
            name="email"
            id="email"
            placeholder="Email Address..."
            value={registrationRequest.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="username">Nickname</label>
          <input
            type="text"
            className="input is-fullwidth mb-1"
            name="nickname"
            id="nickname"
            placeholder="Nickname..."
            value={registrationRequest.nickname}
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
            value={registrationRequest.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="input is-fullwidth mb-1"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm..."
            value={registrationRequest.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button className="button is-primary is-fullwidth">
          <Icon class="fas fa-user-plus" padding />
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Register;
