import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Common/Modal';
import Icon from '../Common/Icon';
import BoardSettingsModal from './BoardSettingsModal';

const BoardTitleBar = (props) => {
  const [voteModalVisible, setVoteModalVisible] = useState(false);
  const [lockModalVisible, setLockModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  return (
    <>
      {settingsModalVisible && (
        <BoardSettingsModal
          setVisible={setSettingsModalVisible}
          board={props.board}
          teams={props.teams}
          updateBoard={props.updateBoard}
        />
      )}
      <div className="columns is-vcentered">
        {voteModalVisible && (
          <Modal
            title="Start Voting"
            message="Are you sure that you want to start voting for this board? Once voting is started it cannot be stopped."
            action="Start Voting"
            function={() => {
              props.updateBoard({ ...props.board, allowVotes: true });
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
              props.updateBoard({ ...props.board, locked: true });
            }}
            setVisible={setLockModalVisible}
            icon="fas fa-lock"
            danger
          />
        )}
        <div className="column">
          <h1 className="title is-4 mb-0">{props.board.name}</h1>
          <p>{props.board.description}</p>
        </div>
        <div className="column is-narrow">
          <div className="buttons are-small">
            {props.board.userId === props.profile.id && (
              <>
                <button
                  className={`button ${props.board.allowVotes && 'is-primary'}`}
                  disabled={props.board.allowVotes}
                  onClick={() => setVoteModalVisible(true)}
                >
                  <Icon class="fas fa-thumbs-up" padding />
                  {props.board.allowVotes ? 'Voting Started' : 'Start Voting'}
                </button>
                <button
                  className={`button ${props.board.locked && 'is-primary'}`}
                  onClick={() => setLockModalVisible(true)}
                  disabled={props.board.locked}
                >
                  <Icon class="fas fa-lock" padding />
                  {props.board.locked ? 'Locked' : 'Lock'}
                </button>
                <button
                  className="button"
                  onClick={() => setSettingsModalVisible(true)}
                  disabled={props.board.locked}
                >
                  <Icon class="fas fa-cog" padding />
                  Settings
                </button>
                <button
                  className="button"
                  onClick={() => props.setCreateColumnModalVisible(true)}
                  disabled={props.board.locked}
                >
                  <Icon class="fas fa-plus" padding />
                  Add Column
                </button>
              </>
            )}
            {props.board.instructions && (
              <button
                className="button"
                onClick={() => props.setShowInstructions(true)}
              >
                <Icon class="fas fa-info-circle" padding />
                Instructions
              </button>
            )}
            <Link to={props.dashboardPath}>
              <button className="button">
                <Icon class="fas fa-home" padding /> Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
      {props.board.allowVotes && !props.board.locked ? (
        <div className="notification is-primary">
          <Icon class="fas fa-exclamation-triangle" padding />
          Voting is now enabled on this board{' '}
          {props.votesRemaining > 0 ? 'and' : 'but'} you have{' '}
          {props.votesRemaining} votes left.
        </div>
      ) : null}
      {props.board.locked ? (
        <div className="notification is-warning">
          <Icon class="fas fa-exclamation-triangle" padding />
          This board is now locked and no further changes can be made.
        </div>
      ) : null}
    </>
  );
};

export default BoardTitleBar;
