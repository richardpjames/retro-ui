/* eslint jsx-a11y/anchor-is-valid:0 */

import React, { useState } from 'react';

const ColumnHeading = (props) => {
  const [editable, setEditable] = useState(false);
  const [columnTitle, setColumnTitle] = useState(props.column.title);

  const handleSave = (event) => {
    event.preventDefault();
    props.renameColumn({ ...props.column, title: columnTitle });
    setEditable(false);
  };

  const handleCancel = () => {
    setEditable(false);
    setColumnTitle(props.column.title);
  };

  if (editable) {
    return (
      <form onSubmit={handleSave} className="mb-3">
        <input
          className="is-fullwidth input mx-0 my-0 is-size-6-7"
          type="text"
          value={columnTitle}
          onChange={(event) => {
            setColumnTitle(event.target.value);
          }}
          required
        />
        <div className="columns mt-1">
          <div className="column">
            <button className="button is-primary is-small is-fullwidth">
              <i className="fas fa-save mr-3"></i>Save
            </button>
          </div>
          <div className="column">
            <button
              className="button is-small is-fullwidth"
              onClick={handleCancel}
            >
              <i className="fas fa-ban mr-3"></i>Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div {...props.dragHandleProps} className="mb-3">
      <h4 className="subtitle is-4 ml-0 mr-3 mb-3 mt-0">
        {props.column.title}
      </h4>
      <div className="buttons are-small">
        {props.board.userId === props.profile.id && (
          <>
            <a
              className="button is-primary"
              onClick={() => {
                setEditable(true);
              }}
            >
              <i className="fas fa-pencil-alt"></i>
            </a>
            <a
              className="button is-danger"
              onClick={() => {
                if (
                  props.cards.filter((c) => c.columnId === props.column._id)
                    .length > 0
                ) {
                  props.setColumnToDelete(props.column);
                  props.setDeleteColumnModalVisible(true);
                }
              }}
              disabled={
                props.cards.filter((c) => c.columnId === props.column._id)
                  .length > 0
              }
            >
              <i className="fas fa-trash-alt"></i>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ColumnHeading;
