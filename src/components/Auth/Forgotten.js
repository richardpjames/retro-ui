import React, { useState } from 'react';
import axios from 'axios';
import Icon from '../Common/Icon';

const Forgotten = (props) => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    setMessage('');
    setError('');
    // Make the request
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/forgotten`,
        { email },
        { withCredentials: true },
      );
      setMessage(
        'An email has been sent to the address you entered with further instructions.',
      );
      return true;
    } catch (error) {
      setError(
        'We could not send you a password reset link. Please check your email address and try again.',
      );
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="content mx-5 my-5">
          <div className="container">
            <div className="content mx-5 my-5">
              <h1 className="title is-1">
                <Icon class="fas fa-question" padding />
                Reset Password
              </h1>

              <p>
                If you've forgotten your password then simply type your email
                address below. We will then email you a link so that you can
                reset your password to something new.
              </p>

              {error && <div className="notification is-danger">{error}</div>}
              {message && (
                <div className="notification is-success">{message}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="input is-fullwidth mb-1"
                    name="email"
                    id="email"
                    placeholder="Email Address..."
                    value={email}
                    onChange={handleChange}
                    required
                    disabled={disabled}
                  />
                </div>

                <button
                  className="button is-primary is-fullwidth"
                  disabled={disabled}
                >
                  <Icon class="fas fa-unlock-alt" padding />
                  Request Reset Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotten;
