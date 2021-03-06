import React, { useState } from 'react';

const DeleteBoardModal = (props) => {
  const [confirm, updateConfirm] = useState('');
  const [buttonDisabled, updateButtonDisabled] = useState(true);

  const closeModal = () => {
    props.updateModalVisible(false);
    updateConfirm('');
    updateButtonDisabled(true);
  };

  const checkInput = (event) => {
    updateConfirm(event.target.value);
    if (event.target.value.toLowerCase() === 'delete') {
      updateButtonDisabled(false);
    } else {
      updateButtonDisabled(true);
    }
  };

  const checkKeyPress = (event) => {
    // If the enter key has been pressed and the wording is correct
    if (
      event.charCode === 13 &&
      event.target.value.toLowerCase() === 'delete'
    ) {
      props.removeBoard(props.board.boardid);
      props.updateModalVisible(false);
      updateButtonDisabled(true);
      updateConfirm('');
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
    <div className={checkVisible()} id="deleteBoardModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">{props.board.name}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="my-3">
            If you are sure you want to delete this board, please enter the word
            "delete" into the text box and press the delete button.
          </p>
          <p>
            Please note that deleting this board will also delete any actions
            raised from this retrospective.
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
              props.removeBoard(props.board.boardid);
              props.updateModalVisible(false);
              updateButtonDisabled(true);
              updateConfirm('');
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

export default DeleteBoardModal;
