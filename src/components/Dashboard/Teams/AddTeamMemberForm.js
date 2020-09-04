import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMember } from '../../../redux/actions/memberActions';

const AddTeamMemberForm = (props) => {
  // Get the team from props
  const { team } = props;
  // Get the redux dispatcher
  const dispatch = useDispatch();

  // For input on the form
  const defaultInput = { email: '', status: 'invited' };
  const [input, setInput] = useState(defaultInput);

  // Check when API calls are running
  const apiCalls = useSelector((state) => state.apiCalls);

  // Handle changes to input
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createMember(team.teamid, input));
    setInput(defaultInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              type="email"
              className="input"
              placeholder="richard@retrospectacle.io"
              value={input.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div className="control">
            <button
              className={`button is-primary ${apiCalls > 0 && 'is-loading'}`}
              disabled={apiCalls > 0}
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>Add Member</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTeamMemberForm;
