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
      <div className="shadow-md p-3 bg-white border-1 border-gray-200 rounded mb-2">
        <div>
          <strong>{action.owner}</strong> - {action.text}
        </div>
        <div className="buttons are-small mt-3">
          <a
            className="bg-teal-500 rounded w-full text-white text-center py-1 border-b-2 border-teal-800 mb-2 hover:text-white hover:bg-teal-600"
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
