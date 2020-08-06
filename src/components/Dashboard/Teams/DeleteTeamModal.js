import React, { useState } from 'react';

const DeleteTeamModal = (props) => {
  const [confirm, setConfirm] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const closeModal = () => {
    props.setModalVisible(false);
    setConfirm('');
    setButtonDisabled(true);
  };

  const checkInput = (event) => {
    setConfirm(event.target.value);
    if (event.target.value.toLowerCase() === 'delete') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const checkKeyPress = (event) => {
    // If the enter key has been pressed and the wording is correct
    if (
      event.charCode === 13 &&
      event.target.value.toLowerCase() === 'delete'
    ) {
      props.removeTeam(props.team._id);
      props.setModalVisible(false);
      setButtonDisabled(true);
      setConfirm('');
    }
  };

  const checkVisible = () => {
    if (props.visible) {
      return 'modal is-active';
    } else {
      return 'modal';
    }
  };

  const handleForm = (event) => {
    event.preventDefault();
  };

  return (
    <div className={checkVisible()} id="deleteTeamModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">{props.team.name}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="my-3">
            If you are sure you want to delete this team, please enter the word
            "delete" into the text box and press the delete button.
          </p>
          <p className="has-text-danger mb-3">
            There is no way to undo this later.
          </p>
          <form onSubmit={handleForm}>
            <div className="field">
              <input
                type="text"
                className="input is-danger"
                placeholder="delete"
                value={confirm}
                onChange={checkInput}
                onKeyPress={checkKeyPress}
                required
              />
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            disabled={buttonDisabled}
            className="button is-danger"
            onClick={() => {
              props.removeTeam(props.team._id);
              props.setModalVisible(false);
              setButtonDisabled(true);
              setConfirm('');
            }}
          >
            <i className="fas fa-trash-alt mr-3"></i> Delete
          </button>
          <button className="button" onClick={closeModal}>
            <i className="fas fa-ban mr-3"></i> Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteTeamModal;
