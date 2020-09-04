import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTeam } from '../../../redux/actions/teamActions';

const CreateTeamModal = (props) => {
  // Get the dispatch function
  const dispatch = useDispatch();

  // State for holding the input from the form
  const defaultInput = { name: '' };
  const [input, setInput] = useState(defaultInput);

  // When data on the form is changed
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTeam(input));
    props.setVisible(false);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <h5 className="title is-5">Create New Team</h5>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Team Name</label>
              <input
                type="text"
                className="input"
                id="name"
                name="name"
                placeholder="e.g. Team America: World Police"
                value={input.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="buttons mt-5">
              <button type="submit" className="button is-primary">
                <i className="fas fa-plus mr-3"></i> Create
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

export default CreateTeamModal;
