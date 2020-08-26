import React, { useState } from 'react';

const CreateColumnModal = (props) => {
  const [columnName, setColumnName] = useState('');

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    props.contollers.columnsController.addColumn({
      title: columnName,
    });
    setColumnName('');
    props.setVisible(false);
  };

  // Reset state and close the modal
  const closeModal = () => {
    setColumnName('');
    props.setVisible(false);
  };

  // Set the class of the modal depending on whether it's visible
  const checkVisible = () => {
    if (props.visible) {
      return 'modal is-active';
    } else {
      return 'modal';
    }
  };

  return (
    <div className={checkVisible()} id="createColumnModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">Add a New Column</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="field">
              <label htmlFor="boardName">Column Title</label>
              <input
                type="text"
                className="input"
                id="columnName"
                placeholder="e.g. What went well"
                value={columnName}
                onChange={(event) => setColumnName(event.target.value)}
                required
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button className="button is-primary">
                <i className="fas fa-plus mr-3"></i> Add
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

export default CreateColumnModal;
