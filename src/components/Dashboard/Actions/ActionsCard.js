/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import ActionModal from './ActionModal';

const ActionsCard = (props) => {
  // Whether to show the action details
  const [showModal, setShowModal] = useState(false);

  // Get the action from props
  const { action } = props;

  return (
    <>
      {showModal && (
        <ActionModal
          action={action}
          setVisible={setShowModal}
          setDragDisabled={props.setDragDisabled}
        />
      )}
      <div className="box mb-3">
        <div>
          <strong>{action.owner}</strong> - {action.text}
        </div>
        <div className="buttons are-small mt-3">
          <a
            className="button is-primary is-fullwidth"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <span className="icon">
              <i className="fas fa-search"></i>
            </span>
            <span>Show Details</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ActionsCard;
