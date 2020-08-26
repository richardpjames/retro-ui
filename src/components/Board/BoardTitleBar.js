import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Common/Modal';
import Icon from '../Common/Icon';
import BoardSettingsModal from './BoardSettingsModal';
import BoardUsers from './BoardUsers';

const BoardTitleBar = (props) => {
  const [voteModalVisible, setVoteModalVisible] = useState(false);
  const [lockModalVisible, setLockModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  return (
    <>
      {settingsModalVisible && (
        <BoardSettingsModal
          setVisible={setSettingsModalVisible}
          board={props.data.board}
          teams={props.data.teams}
          updateBoard={props.controllers.boardsController.updateBoard}
        />
      )}
      <div className="columns is-vcentered">
        {voteModalVisible && (
          <Modal
            title="Start Voting"
            message="Are you sure that you want to start voting for this board? Once voting is started it cannot be stopped."
            action="Start Voting"
            function={() => {
              props.controllers.boardsController.updateBoard({
                ...props.data.board,
                allowvotes: true,
              });
            }}
            setVisible={setVoteModalVisible}
            icon="fas fa-thumbs-up"
          />
        )}
        {lockModalVisible && (
          <Modal
            title="Lock Board"
            message="Are you sure that you want to lock this board? Users (including you) will no longer be able to make changes. Once a board is locked it cannot be unlocked."
            action="Lock"
            function={() => {
              props.controllers.boardsController.updateBoard({
                ...props.data.board,
                locked: true,
              });
            }}
            setVisible={setLockModalVisible}
            icon="fas fa-lock"
            danger
          />
        )}
        <div className="column">
          <div className="columns is-vcentered">
            <div className="column is-narrow">
              <h1 className="title is-4 mb-0">{props.data.board.name}</h1>
              <p>{props.data.board.description}</p>
            </div>
            <div className="column">
              <BoardUsers boardUsers={props.data.boardUsers} />
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <div className="buttons are-small">
            {props.data.board.userid === props.data.profile.userid && (
              <>
                <button
                  className={`button ${
                    props.data.board.allowvotes && 'is-primary'
                  }`}
                  disabled={props.data.board.allowvotes}
                  onClick={() => setVoteModalVisible(true)}
                >
                  <Icon class="fas fa-thumbs-up" padding />
                  {props.data.board.allowvotes
                    ? 'Voting Started'
                    : 'Start Voting'}
                </button>
                <button
                  className={`button ${
                    props.data.board.locked && 'is-primary'
                  }`}
                  onClick={() => setLockModalVisible(true)}
                  disabled={props.data.board.locked}
                >
                  <Icon class="fas fa-lock" padding />
                  {props.data.board.locked ? 'Locked' : 'Lock'}
                </button>
                <button
                  className="button"
                  onClick={() => setSettingsModalVisible(true)}
                  disabled={props.data.board.locked}
                >
                  <Icon class="fas fa-cog" padding />
                  Settings
                </button>
                <button
                  className="button"
                  onClick={() => props.modals.setCreateColumnModalVisible(true)}
                  disabled={props.data.board.locked}
                >
                  <Icon class="fas fa-plus" padding />
                  Add Column
                </button>
              </>
            )}
            {props.data.board.instructions && (
              <button
                className="button"
                onClick={() => props.data.setShowinstructions(true)}
              >
                <Icon class="fas fa-info-circle" padding />
                Instructions
              </button>
            )}
            <Link to="/dashboard">
              <button className="button">
                <Icon class="fas fa-home" padding /> Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>

      {props.data.board.allowvotes && !props.data.board.locked ? (
        <div className="notification is-primary">
          <Icon class="fas fa-exclamation-triangle" padding />
          Voting is now enabled on this board{' '}
          {props.data.votesRemaining > 0 ? 'and' : 'but'} you have{' '}
          {props.data.votesRemaining} votes left.
        </div>
      ) : null}
      {props.data.board.locked ? (
        <div className="notification is-warning">
          <Icon class="fas fa-exclamation-triangle" padding />
          This board is now locked and no further changes can be made.
        </div>
      ) : null}
    </>
  );
};

export default BoardTitleBar;
