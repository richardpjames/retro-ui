import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTeam } from '../../../redux/actions/teamActions';
import { useHistory } from 'react-router-dom';

const DeleteTeamModal = (props) => {
  // Get the team from props
  const { team } = props;

  // Get the dispatcher for deleting teams
  const dispatch = useDispatch();
  // Get the history object to redirect
  const history = useHistory();

  // For controlling input on the form
  const defaultInput = { confirm: '' };
  const [input, setInput] = useState(defaultInput);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // For changes to the fields within the form
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    if (event.target.value.toLowerCase() === 'delete') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  // For when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.confirm.toLowerCase() === 'delete') {
      // Once the team has been removed we will need to redirect
      dispatch(removeTeam(team.teamid));
      // Prevent the next page from reloading
      localStorage.setItem('preventReload', true);
      // Go back to the teams page on the dashboard
      history.push('/dashboard/teams');
    }
  };

  return (
    <div className="modal is-active" id="deleteTeamModal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h5 className="title is-5">Delete Team</h5>
          <p className="my-3">
            If you are sure you want to delete this team, please enter the word
            "delete" into the text box and press the delete button.
          </p>
          <p className="my3">
            <strong>
              Please note that deleting a team will delete all boards that
              belong to that team!
            </strong>
          </p>
          <p className="has-text-danger my-3">
            There is no way to undo this later.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                className="input is-danger"
                placeholder="delete"
                value={input.confirm}
                onChange={handleChange}
                name="confirm"
                required
              />
            </div>
            <div className="buttons mt-5">
              <button
                type="submit"
                className="button is-danger"
                disabled={buttonDisabled}
              >
                <i className="fas fa-trash-alt mr-3"></i> Delete Team
              </button>
              <button
                type="button"
                className="button"
                onClick={() => {
                  props.setVisible(false);
                }}
              >
                <i className="fas fa-ban mr-3"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeamModal;
