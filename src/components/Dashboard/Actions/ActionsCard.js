/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import moment from 'moment';
import DeleteUpdateModal from './DeleteUpdateModal';

const ActionsCard = (props) => {
  const [update, setUpdate] = useState('');
  const [deleteUpdateModalVisible, setDeleteUpdateModalVisible] = useState(
    false,
  );
  const [updateToDelete, setUpdateToDelete] = useState(0);

  const boardLink = `/board/${props.action.boardId}`;

  const handleOpenReOpen = () => {
    props.updateAction({ ...props.action, open: !props.action.open });
  };

  const removeUpdate = (index) => {
    props.action.updates.splice(index, 1);
    props.updateAction(props.action);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    props.action.updates.push({
      created: Date.now(),
      userId: props.profile.id,
      update: update,
      nickName: props.profile.nickname,
    });
    props.updateAction(props.action);
    setUpdate('');
  };

  return (
    <div className="box">
      <DeleteUpdateModal
        visible={deleteUpdateModalVisible}
        setModalVisible={setDeleteUpdateModalVisible}
        index={updateToDelete}
        removeUpdate={removeUpdate}
      />

      <div className="columns is-vcentered mb-0">
        <div className="column">
          <h5 className="title is-5 mb-0">
            {props.action.text} - Due{' '}
            {moment(props.action.due).format('DD/MM/YYYY')}
          </h5>
          <p className="is-size-7 mb-0">
            Created {moment(props.action.created).format('DD/MM/YYYY HH:mm')}
            {props.action.boardName && (
              <>
                {' '}
                as part of <a href={boardLink}>{props.action.boardName}</a>
              </>
            )}
            {props.action.teamName && <> (Team: {props.action.teamName})</>}
          </p>
          <p className="is-size-7">Owner: {props.action.owner}</p>
        </div>
        <div className="column is-narrow">
          <div className="buttons">
            {props.action.open && (
              <button className="button is-primary" onClick={handleOpenReOpen}>
                <i className="fas fa-check mr-3"></i> Close
              </button>
            )}
            {!props.action.open && (
              <button className="button is-danger" onClick={handleOpenReOpen}>
                <i className="fas fa-times mr-3"></i> Re-Open
              </button>
            )}
          </div>
        </div>
      </div>

      {props.action.updates.length > 0 && (
        <div className="mt-0 mb-3">
          <ul className="mt-0">
            {props.action.updates.map((update, index) => (
              <li key={update.created}>
                {props.action.open && update.userId === props.profile.user_id && (
                  <a
                    onClick={() => {
                      setUpdateToDelete(index);
                      setDeleteUpdateModalVisible(true);
                    }}
                    className="has-text-danger"
                  >
                    <i className="mr-3 far fa-trash-alt has-text-danger"></i>
                  </a>
                )}
                <strong className="is-capitalized">
                  {update.nickName} (
                  {moment(update.created).format('DD/MM/YYYY')})
                </strong>{' '}
                - {update.update}
              </li>
            ))}
          </ul>
        </div>
      )}
      {props.action.open && (
        <div>
          <form onSubmit={handleUpdate}>
            <label htmlFor="update">Action Update</label>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <input
                    type="text"
                    className="input"
                    id="update"
                    placeholder="e.g. Added the sprint goal to the scrum board"
                    value={update}
                    onChange={(event) => setUpdate(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="column is-narrow">
                <div className="buttons">
                  <button className="button is-primary">
                    <i className="fas fa-plus mr-3"></i> Add Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ActionsCard;