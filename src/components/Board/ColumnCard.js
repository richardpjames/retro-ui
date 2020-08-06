/* eslint jsx-a11y/anchor-is-valid:0 */

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ColumnCard = (props) => {
  const handleDelete = (event) => {
    props.setCardToDelete(props.card);
    props.setDeleteCardModalVisible(true);
  };

  const handleCancel = (event) => {
    setEditable(false);
    props.setDragDisabled(false);
    setUpdatedCard(props.card);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setEditable(false);
    props.setDragDisabled(false);
    props.updateCard(updatedCard);
  };

  const handleVote = (event) => {
    // If the user has voted already then remove
    if (userVote) {
      return props.deleteVote(userVote._id, props.card._id);
    }
    // Otherwise create a new vote
    const _vote = {
      cardId: props.card._id,
      boardId: props.card.boardId,
      userId: props.profile.id,
    };
    return props.addVote(_vote);
  };

  const onChange = (event) => {
    setUpdatedCard({ ...updatedCard, [event.target.name]: event.target.value });
  };

  const [editable, setEditable] = useState(false);
  const [updatedCard, setUpdatedCard] = useState(props.card);
  const { user } = useAuth0();
  const userVote = props.votes.find((v) => v.userId === props.profile.id);

  if (!editable) {
    return (
      <div className="card card-white-bg is-size-6-7">
        <div className="card-content py-4 px-4">
          <p>
            <strong className="is-capitalized">{props.card.nickName}</strong> -{' '}
            {props.card.text}
          </p>
          <div className="buttons">
            {user.sub === props.card.userId ? (
              <>
                <a
                  className="button is-rounded is-small is-outlined is-primary has-tooltip-primary"
                  onClick={() => {
                    setEditable(true);
                    props.setDragDisabled(true);
                  }}
                  data-tooltip="Edit Card"
                >
                  <i className="fas fa-pencil-alt"></i>
                </a>
                <a
                  className="button is-rounded is-small is-outlined is-danger has-tooltip-danger"
                  onClick={handleDelete}
                  data-tooltip="Delete Card"
                >
                  <i className="fas fa-trash-alt"></i>
                </a>
              </>
            ) : null}

            {!userVote && (
              <a
                className="button is-rounded is-small is-outlined is-primary has-tooltip-primary"
                disabled={props.votesRemaining <= 0}
                data-tooltip="Vote for Card"
                onClick={handleVote}
              >
                <i className="fas fa-thumbs-up"></i> ({props.votes.length})
              </a>
            )}
            {userVote && (
              <a
                className="button is-rounded is-small is-primary has-tooltip-primary"
                data-tooltip="Cancel vote"
                onClick={handleVote}
              >
                <i className="fas fa-thumbs-up"></i> ({props.votes.length})
              </a>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card card-white-bg">
        <div className="card-content px-2 py-2">
          <form onSubmit={handleSave}>
            <textarea
              className="is-fullwidth has-fixed-size textarea mx-0 my-0 is-size-6-7"
              rows="2"
              name="text"
              value={updatedCard.text}
              onChange={onChange}
              required
            ></textarea>
            <div className="columns mt-1">
              <div className="column">
                <button className="button is-primary is-fullwidth">
                  <i className="fas fa-save mr-3"></i>Save
                </button>
              </div>
              <div className="column">
                <button className="button is-fullwidth" onClick={handleCancel}>
                  <i className="fas fa-ban mr-3"></i>Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ColumnCard;
