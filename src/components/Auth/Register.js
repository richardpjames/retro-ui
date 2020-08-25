import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Icon from '../Common/Icon';
import PasswordMeter from './PasswordMeter';

const Register = (props) => {
  const history = useHistory();
  const [registrationRequest, setRegistrationRequest] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [message, setMessage] = useState();
  const [disabled, setDisabled] = useState(true);

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
      <div className="container">
        <div className="content mx-5 my-5">
          <h1 className="title is-1">
            <Icon class="fa fa-user-plus" padding />
            Register
          </h1>

          <p>
            Registering a new account is easy and we will never share your data
            with third parties. Simply provide your email address and password
            along with a nickname (this is how your name will be shown to other
            users).
          </p>

          {message && <div className="notification is-danger">{message}</div>}

          <div className="columns">
            <div className="column">
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

                <button
                  className="button is-primary is-fullwidth"
                  disabled={disabled}
                >
                  <Icon class="fas fa-user-plus" padding />
                  Sign Up
                </button>
              </form>
            </div>
            <div className="column">
              <PasswordMeter
                password={registrationRequest.password}
                confirmPassword={registrationRequest.confirmPassword}
                setDisabled={setDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
