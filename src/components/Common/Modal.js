import React from 'react';
import ReactMarkdown from 'react-markdown';

const Modal = (props) => {
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
          <p className="modal-card-title my-0">{props.title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          {props.message && <p className="my-3">{props.message}</p>}
          {props.markdown && <ReactMarkdown source={props.markdown} />}
        </section>
        <footer className="modal-card-foot">
          <button
            className={`button ${props.danger ? 'is-danger' : 'is-primary'}`}
            onClick={handleClick}
          >
            <i className={`${props.icon || 'fas fa-trash-alt'} mr-3`}></i>{' '}
            {props.action}
          </button>
          {!props.hideCancel && (
            <button className="button" onClick={closeModal}>
              <i className="fas fa-ban mr-3"></i> Cancel
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Modal;
