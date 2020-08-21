import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewTeamModal = (props) => {
  // Create three new state objects to hold the name, description and starter template for the board
  const [teamName, setTeamName] = useState('');

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTeam({
      name: teamName,
    });
    setTeamName('');
    props.setVisible(false);
  };

  const closeModal = () => {
    setTeamName('');
    props.setVisible(false);
  };

  const checkVisible = () => {
    if (props.visible) {
      return 'modal is-active';
    } else {
      return 'modal';
    }
  };

  // This returns the markup
  return (
    <div className={checkVisible()} id="createBoardModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">Create a New Team</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="field">
              <label htmlFor="boardName">Team Name</label>
              <input
                type="text"
                className="input"
                id="teamName"
                placeholder="e.g. Team America: World Police"
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                required
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button className="button is-primary">
                <i className="fas fa-plus mr-3"></i> Create
              </button>
              <button className="button" onClick={closeModal}>
                <i className="fas fa-ban mr-3"></i> Cancel
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default NewTeamModal;
