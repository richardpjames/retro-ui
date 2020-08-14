/* eslint jsx-a11y/anchor-is-valid:0 */

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CirclePicker } from 'react-color';

const ColumnCard = (props) => {
  const [editable, setEditable] = useState(false);
  const [updatedCard, setUpdatedCard] = useState(props.card);
  const [showColourPicker, setShowColourPicker] = useState(false);
  const [showEditControls, setShowEditControls] = useState(false);
  const { user } = useAuth0();
  const userVote = props.votes.find((v) => v.userId === props.profile.id);

  const colours = [
    '#FFFFFF',
    '#FF9AA2',
    '#FFB7B2',
    '#FFDAC1',
    '#E2F0CB',
    '#B5EAD7',
    '#C7CEEA',
  ];

  const handleColourChange = (colour) => {
    const _card = { ...props.card };
    _card.colour = colour.hex;
    props.updateCard(_card);
    setShowColourPicker(false);
  };

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

  if (!editable) {
    return (
      <div
        className="card is-size-6-7"
        style={{ backgroundColor: props.card.colour || '#FFFFFF' }}
      >
        <div className="card-content py-4 px-4">
          <p>
            <strong className="is-capitalized">{props.card.nickName}</strong> -{' '}
            {props.card.text}
          </p>
          {props.card.combinedCards &&
            props.card.combinedCards.map((card, index) => {
              return (
                <div key={index} className="mb-3">
                  <hr className="mb-2 mt-1" />
                  <p>{card.text}</p>

                  <span className="tag is-rounded">
                    <a
                      onClick={() => {
                        props.setCardToSeparate(props.card);
                        props.setIndexToSeparate(index);
                        props.setSeparateCardModalVisible(true);
                      }}
                    >
                      <i className="fas fa-unlink"></i> Separate
                    </a>
                  </span>
                </div>
              );
            })}
          <div className="columns is-vcentered is-mobile">
            <div className="column">
              {!userVote && (
                <a
                  className="tag is-small"
                  disabled={props.votesRemaining <= 0}
                  onClick={handleVote}
                >
                  <i className="fas fa-thumbs-up"></i> ({props.votes.length})
                </a>
              )}
              {userVote && (
                <a className="tag is-small is-primary" onClick={handleVote}>
                  <i className="fas fa-thumbs-up"></i> ({props.votes.length})
                </a>
              )}
            </div>
            <div className="column is-narrow">
              {user.sub === props.card.userId && (
                <>
                  <span className="tag is-rounded mr-1">
                    <a
                      className="is-small"
                      onClick={() => {
                        setShowEditControls(false);
                        setShowColourPicker(!showColourPicker);
                      }}
                    >
                      <i className="fas fa-eye-dropper"></i>
                    </a>
                  </span>

                  <span className="tag is-rounded">
                    <a
                      className="is-small"
                      onClick={() => {
                        setShowColourPicker(false);
                        setShowEditControls(!showEditControls);
                      }}
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </a>
                  </span>
                </>
              )}
            </div>
          </div>
          {showColourPicker && (
            <CirclePicker
              onChangeComplete={handleColourChange}
              width="100%"
              circleSize={29}
              circleSpacing={11}
              colors={colours.filter(
                (c) => c.toLowerCase() !== props.card.colour,
              )}
            />
          )}
          {showEditControls && (
            <div className="columns">
              <div className="column">
                <a
                  className="button is-small is-fullwidth is-primary"
                  onClick={() => {
                    setEditable(true);
                    setShowEditControls(false);
                    props.setDragDisabled(true);
                  }}
                >
                  <i className="fas fa-pencil-alt mr-3"></i> Edit
                </a>
              </div>
              <div className="column">
                <a
                  className="button is-small is-fullwidth is-danger"
                  onClick={() => {
                    setShowEditControls(false);
                    handleDelete();
                  }}
                >
                  <i className="fas fa-trash-alt mr-3"></i> Delete
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="card card-white-bg"
        style={{ backgroundColor: props.card.colour || '#FFFFFF' }}
      >
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
        </div>
      </div>
    );
  }
};

export default ColumnCard;
