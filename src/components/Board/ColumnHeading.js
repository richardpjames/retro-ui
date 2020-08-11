import React from 'react';

const ColumnHeading = (props) => {
  return (
    <div {...props.dragHandleProps} className="mb-3">
      <h4 className="subtitle is-4 ml-0 mr-3 mb-3 mt-0">
        {props.column.title}
      </h4>
      <div className="buttons are-small">
        {props.board.userId === props.profile.id && (
          <>
            <button
              className="button is-danger"
              onClick={() => {
                props.setColumnToDelete(props.column);
                props.setDeleteColumnModalVisible(true);
              }}
              disabled={
                props.cards.filter((c) => c.columnId === props.column._id)
                  .length > 0
              }
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ColumnHeading;
