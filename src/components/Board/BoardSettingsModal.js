import React from 'react';
import Icon from '../Common/Icon';

const BoardSettingsModal = (props) => {
  // Used to close the modal from the cancel or cross button
  const closeModal = () => {
    props.setVisible(false);
    document.activeElement.blur();
  };

  // Used to execute the provided function
  const handleClick = () => {
    props.function();
    props.setVisible(false);
    document.activeElement.blur();
  };

  return (
    <div className="modal is-active" id="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">Board Settings</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="my-3">{props.message}</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={handleClick}>
            <Icon class="fas fa-save" padding /> Save
          </button>
          <button className="button" onClick={closeModal}>
            <i className="fas fa-ban mr-3"></i> Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default BoardSettingsModal;
