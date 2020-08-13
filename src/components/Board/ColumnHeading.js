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
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          <h4 className="subtitle is-4 mb-0">{props.column.title}</h4>
        </div>
        <div className="column is-narrow">
          {props.board.userId === props.profile.id && (
            <div className="dropdown is-right is-hoverable">
              <div className="dropdown-trigger">
                <span className="tag is-rounded">
                  <a
                    className="is-small"
                    aria-haspopup="true"
                    aria-controls={`dropdown-column-${props.column._id}`}
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </a>
                </span>
              </div>
              <div
                className="dropdown-menu"
                id={`dropdown-column-${props.column._id}`}
                role="menu"
              >
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <a
                      className="button is-small is-primary is-fullwidth"
                      onClick={() => {
                        setEditable(true);
                      }}
                    >
                      <i className="fas fa-pencil-alt mr-3"></i> Rename Column
                    </a>
                  </div>
                  <div className="dropdown-item">
                    <a
                      className="button is-small is-danger is-fullwidth"
                      onClick={() => {
                        if (
                          !props.cards.filter(
                            (c) => c.columnId === props.column._id,
                          ).length > 0
                        ) {
                          props.setColumnToDelete(props.column);
                          props.setDeleteColumnModalVisible(true);
                        }
                      }}
                      disabled={
                        props.cards.filter(
                          (c) => c.columnId === props.column._id,
                        ).length > 0
                      }
                    >
                      <i className="fas fa-trash-alt mr-3"></i> Delete Column
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColumnHeading;
