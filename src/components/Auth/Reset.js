import React, { useState } from 'react';
import axios from 'axios';
import Icon from '../Common/Icon';

const Reset = (props) => {
  document.title = 'RetroSpectacle - Password Reset';
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', 'The RetroSpectacle password reset page');

  const [input, setInput] = useState({ password: '', confirmPassword: '' });
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    setMessage('');
    setError('');
    // Make the request
    try {
      if (input.password !== input.confirmPassword) {
        setError('Passwords do not match');
        setInput({ password: '', confirmPassword: '' });
        setDisabled(false);
        return true;
      }
      await axios.post(
        '/api/auth/reset',
        {
          userId: props.match.params.userId,
          resetToken: props.match.params.resetToken,
          password: input.password,
        },
        { withCredentials: true },
      );
      setMessage(
        'Your password has been reset, you can now log in using your new password.',
      );
      return true;
    } catch (error) {
      setError(
        'An error has occurred, please check that you have followed the latest email link that was sent to you.',
      );
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="content mx-5 my-5">
          <h1 className="title is-1">Forgotten Password</h1>

          {error && <div className="notification is-danger">{error}</div>}
          {message && <div className="notification is-success">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="input is-fullwidth mb-1"
                name="password"
                id="password"
                placeholder="Password..."
                value={input.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                className="input is-fullwidth mb-1"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password..."
                value={input.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="button is-primary is-fullwidth"
              disabled={disabled}
            >
              <Icon class="fas fa-unlock-alt" padding />
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;
