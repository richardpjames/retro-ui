import React, { useState } from 'react';
import axios from 'axios';
import Icon from '../Common/Icon';

const UpdatePassword = (props) => {
  const blankInput = { password: '', newPassword: '', confirmPassword: '' };
  const [input, setInput] = useState(blankInput);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      setDisabled(true);
      setMessage('');
      setError('');
      event.preventDefault();
      if (input.newPassword !== input.confirmPassword) {
        setError('Passwords do not match');
        setInput(blankInput);
        setDisabled(false);
        return true;
      }
      await axios.put(
        `/api/users/${props.profile.userid}`,
        {
          _id: props.profile.userid,
          email: props.profile.email,
          nickname: props.profile.nickname,
          password: input.password,
          newPassword: input.newPassword,
        },
        { withCredentials: true },
      );
      setMessage('Your password has been changed succesfully.');
      setInput(blankInput);
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setError(
        'An error has occurred, please check your password and try again.',
      );
      setInput(blankInput);
      setDisabled(false);
    }
  };

  return (
    <>
      <h2 className="title is-2">Update Your Password</h2>
      {error && <div className="notification is-danger">{error}</div>}
      {message && <div className="notification is-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="password">Existing Password</label>
          <input
            type="password"
            className="input is-fullwidth mb-1"
            name="password"
            id="password"
            placeholder="Existing Password..."
            value={input.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            className="input is-fullwidth mb-1"
            name="newPassword"
            id="newPassword"
            placeholder="New Password..."
            value={input.newPassword}
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

        <button className="button is-primary is-fullwidth" disabled={disabled}>
          <Icon class="fas fa-unlock-alt" padding />
          Update Password
        </button>
      </form>
    </>
  );
};

export default UpdatePassword;
