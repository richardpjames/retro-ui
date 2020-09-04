import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUpdate } from '../../../redux/actions/updateActions';

const AddUpdateForm = (props) => {
  // Get the team from props
  const { action, createUpdate, apiCalls } = props;
  // Get the redux dispatcher

  // For input on the form
  const defaultInput = { update: '' };
  const [input, setInput] = useState(defaultInput);

  // Handle changes to input
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    createUpdate(action.actionid, input);
    setInput(defaultInput);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              type="text"
              className="input"
              placeholder="Action Update"
              value={input.update}
              onChange={handleChange}
              name="update"
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
              <span>Add Update</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

// Map state to props
const mapStateToProps = (state) => {
  return {
    apiCalls: state.apiCalls,
  };
};

// Map dispatch to props
const mapDispatchToProps = {
  createUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateForm);
