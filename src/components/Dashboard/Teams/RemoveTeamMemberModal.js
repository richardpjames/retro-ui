import React from 'react';

const RemoveTeamMemberModal = (props) => {
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
    <div className={checkVisible()} id="deleteBoardModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">Remove Team Member</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <p className="my-3">
            Are you sure that you want to remove this member from the team?
          </p>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-danger"
            onClick={() => {
              props.removeTeamMember(
                props.teamMemberToRemove.teamId,
                props.teamMemberToRemove.email,
              );
              props.setModalVisible(false);
            }}
          >
            <i className="fas fa-trash-alt mr-3"></i> Remove
          </button>
          <button className="button" onClick={closeModal}>
            <i className="fas fa-ban mr-3"></i> Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default RemoveTeamMemberModal;