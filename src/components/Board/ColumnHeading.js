import React from 'react';

const ColumnHeading = (props) => {
  return (
    <>
      <h4 className="subtitle is-4 ml-0 mr-3 mb-3 mt-0">
        {props.column.title}
      </h4>
      <div className="buttons">
        {props.board.userId === props.profile.id && (
          <>
            <button
              className="button is-small"
              disabled={props.column.order <= 1}
              onClick={() => props.moveColumn(props.column, -1)}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <button
              className="button is-small"
              disabled={props.column.order === props.columns.length}
              onClick={() => props.moveColumn(props.column, 1)}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
            <button
              className="button is-danger is-small"
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
    </>
  );
};

export default ColumnHeading;
