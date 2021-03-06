import React from 'react';

const NewColumnControl = (props) => {
  return (
    <>
      {props.board.userid === props.profile.userid && (
        <div className="column is-vcentered is-narrow">
          <button
            className="button"
            onClick={() => props.setCreateColumnModalVisible(true)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default NewColumnControl;
