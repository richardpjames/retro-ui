/* eslint jsx-a11y/anchor-is-valid:0 */

import React, { useState } from 'react';
import Modal from '../Common/Modal';

const ColumnHeading = (props) => {
  const [editable, setEditable] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [columnTitle, setColumnTitle] = useState(props.column.title);
  const [showEditControls, setShowEditControls] = useState(false);

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
      {deleteModalVisible && (
        <Modal
          title="Delete Column"
          message="Are you sure that you want to delete this column?"
          action="Delete"
          function={() => {
            props.deleteColumn(props.column);
          }}
          setVisible={setDeleteModalVisible}
          danger
        />
      )}
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          <h4 className="subtitle is-4 mb-0">{props.column.title}</h4>
        </div>
        <div className="column is-narrow">
          {props.board.userid === props.profile.userid && (
            <>
              {!props.board.locked && (
                <span className="tag is-rounded">
                  <a
                    className="is-small"
                    onClick={() => setShowEditControls(!showEditControls)}
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </a>
                </span>
              )}
            </>
          )}
        </div>
      </div>
      {showEditControls && (
        <div className="columns is-mobile">
          <div className="column">
            <a
              className="button is-small is-primary is-fullwidth"
              onClick={() => {
                setShowEditControls(false);
                setEditable(true);
              }}
            >
              <i className="fas fa-pencil-alt mr-3"></i> Rename
            </a>
          </div>
          <div className="column">
            <a
              className="button is-small is-danger is-fullwidth"
              onClick={() => {
                if (
                  !props.cards.filter(
                    (c) => c.columnid === props.column.columnid,
                  ).length > 0
                ) {
                  setShowEditControls(false);
                  setDeleteModalVisible(true);
                }
              }}
              disabled={
                props.cards.filter((c) => c.columnid === props.column.columnid)
                  .length > 0
              }
            >
              <i className="fas fa-trash-alt mr-3"></i> Delete
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnHeading;
