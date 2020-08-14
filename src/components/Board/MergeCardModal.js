import React from 'react';

const MergeCardModal = (props) => {
  // Used to close the modal from the cancel or cross button
  const closeModal = () => {
    props.setModalVisible(false);
  };

  // Checks whether the modal is visible to ensure it's displayed properly
  const checkVisible = () => {
    if (props.visible) {
      return 'modal is-active';
    } else {
      return 'modal';
    }
  };

  return (
    <div className={checkVisible()} id="mergeCardModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">Merge Cards</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="my-3">
            Are you sure that you want to merge these cards?
          </p>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-primary"
            onClick={() => {
              props.combineCards(props.parentCard, props.childCard);
              props.setModalVisible(false);
            }}
          >
            <i className="fas fa-link mr-3"></i> Merge
          </button>
          <button className="button" onClick={closeModal}>
            <i className="fas fa-ban mr-3"></i> Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MergeCardModal;
