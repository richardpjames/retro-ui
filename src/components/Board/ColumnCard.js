/* eslint jsx-a11y/anchor-is-valid:0 */

import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import Modal from '../Common/Modal';
import Icon from '../Common/Icon';

const ColumnCard = (props) => {
  const [editable, setEditable] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updatedCard, setUpdatedCard] = useState(props.card);
  const [showColourPicker, setShowColourPicker] = useState(false);
  const [showEditControls, setShowEditControls] = useState(false);
  const userVote = props.votes.find((v) => v.userid === props.profile.userid);

  // The list of colours for the colour picker
  const colours = [
    '#ffffff',
    '#444444',
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#607d8b',
    '#795548',
  ];
  // These are the foreground colours to use with the colours above
  const foreground = [];
  foreground['#FFFFFF'] = '#4a4a4a';
  foreground['#444444'] = '#f5f5f5';
  foreground['#f44336'] = '#f5f5f5';
  foreground['#e91e63'] = '#f5f5f5';
  foreground['#9c27b0'] = '#f5f5f5';
  foreground['#673ab7'] = '#f5f5f5';
  foreground['#3f51b5'] = '#f5f5f5';
  foreground['#2196f3'] = '#f5f5f5';
  foreground['#00bcd4'] = '#4a4a4a';
  foreground['#009688'] = '#f5f5f5';
  foreground['#4caf50'] = '#f5f5f5';
  foreground['#8bc34a'] = '#4a4a4a';
  foreground['#cddc39'] = '#4a4a4a';
  foreground['#ffeb3b'] = '#4a4a4a';
  foreground['#ffc107'] = '#4a4a4a';
  foreground['#ff9800'] = '#f5f5f5';
  foreground['#ff5722'] = '#f5f5f5';
  foreground['#795548'] = '#f5f5f5';
  foreground['#607d8b'] = '#f5f5f5';
  foreground['#795548'] = '#f5f5f5';

  const handleColourChange = (colour) => {
    const _card = { ...props.card };
    _card.colour = colour.hex;
    props.updateCard(_card);
    setShowColourPicker(false);
  };

  const handleCancel = (event) => {
    document.activeElement.blur();
    setEditable(false);
    setUpdatedCard(props.card);
  };

  const handleSave = (event) => {
    document.activeElement.blur();
    event.preventDefault();
    setEditable(false);
    props.updateCard(updatedCard);
  };

  const handleVote = (event) => {
    // Check if the board is locked
    if (props.board.locked) {
      return false;
    }
    // If the user has voted already then remove
    if (userVote) {
      return props.deleteVote(userVote.voteid, props.card.cardid);
    }
    // If the user has no votes left then return
    if (props.votesRemaining <= 0) {
      return false;
    }

    // Otherwise create a new vote
    const _vote = {
      cardid: props.card.cardid,
      boardid: props.card.boardid,
      userid: props.profile.userid,
    };
    return props.addVote(_vote);
  };

  const onChange = (event) => {
    setUpdatedCard({ ...updatedCard, [event.target.name]: event.target.value });
  };

  if (!editable || props.board.locked) {
    return (
      <>
        {deleteModalVisible && (
          <Modal
            title="Delete Card"
            message="Are you sure that you want to delete this card?"
            action="Delete"
            function={() => {
              props.deleteCard(props.card);
            }}
            setVisible={setDeleteModalVisible}
            danger
          />
        )}
        <div
          className="box is-size-6-7 px-1 py-1"
          style={{
            backgroundColor: props.card.colour || '#FFFFFF',
            color: foreground[props.card.colour] || '#4a4a4a',
          }}
        >
          <div className="card-content py-4 px-4">
            <p>
              <strong
                className="is-capitalized"
                style={{ color: foreground[props.card.colour] || '#4a4a4a' }}
              >
                {props.card.nickname}
              </strong>{' '}
              - {props.card.text}
            </p>
            {props.cards
              .filter((c) => c.parentid === props.card.cardid)
              .map((card, index) => {
                return (
                  <div key={index} className="mb-3">
                    <hr className="mb-2 mt-1" />
                    <p>
                      {!props.board.locked && (
                        <>
                          <span className="tag is-rounded mr-1">
                            <a
                              onClick={() => {
                                props.setParentCardToSeparate(props.card);
                                props.setChildCardToSeparate(card);
                                props.setSeparateCardModalVisible(true);
                              }}
                            >
                              <Icon class="fas fa-unlink" />
                            </a>
                          </span>{' '}
                        </>
                      )}
                      <strong
                        style={{
                          color: foreground[props.card.colour] || '#4a4a4a',
                        }}
                      >
                        {card.nickname}{' '}
                      </strong>{' '}
                      - {card.text}
                    </p>
                  </div>
                );
              })}
            <div className="columns is-vcentered is-mobile">
              <div className="column">
                {!userVote && props.board.allowvotes && (
                  <a className="tag is-small" onClick={handleVote}>
                    <Icon class="fas fa-thumbs-up" /> ({props.votes.length})
                  </a>
                )}
                {userVote && props.board.allowvotes && (
                  <a className="tag is-small is-primary" onClick={handleVote}>
                    <Icon class="fas fa-thumbs-up" /> ({props.votes.length})
                  </a>
                )}
              </div>
              <div className="column is-narrow">
                {!props.board.locked && (
                  <>
                    <span className="tag is-rounded mr-1">
                      <a
                        className="is-small"
                        onClick={() => {
                          setShowEditControls(false);
                          setShowColourPicker(!showColourPicker);
                        }}
                      >
                        <Icon class="fas fa-eye-dropper" />
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
                        <Icon class="fas fa-ellipsis-h" />
                      </a>
                    </span>
                  </>
                )}
              </div>
            </div>
            {showColourPicker && !props.board.locked && (
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
            {showEditControls && !props.board.locked && (
              <div className="buttons">
                {props.card.userid === props.profile.userid && (
                  <a
                    className="button is-small is-primary"
                    onClick={() => {
                      setEditable(true);
                      setShowEditControls(false);
                    }}
                  >
                    <Icon class="fas fa-pencil-alt" padding /> Edit
                  </a>
                )}
                <a
                  className="button is-small is-danger"
                  onClick={() => {
                    setShowEditControls(false);
                    setDeleteModalVisible(true);
                  }}
                >
                  <Icon class="fas fa-trash-alt" padding /> Delete
                </a>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div
        className="box card-white-bg px-1 py-1"
        style={{ backgroundColor: props.card.colour || '#FFFFFF' }}
      >
        <div className="card-content px-2 py-2">
          <form onSubmit={handleSave}>
            <textarea
              className="is-fullwidth has-fixed-size textarea mx-0 my-0 is-size-6-7"
              rows="4"
              name="text"
              value={updatedCard.text}
              onChange={onChange}
              required
            ></textarea>
            <div className="buttons mt-1">
              <button className="button is-primary is-small">
                <Icon class="fas fa-save" padding />
                Save
              </button>

              <button className="button is-small" onClick={handleCancel}>
                <Icon class="fas fa-ban" padding />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ColumnCard;
