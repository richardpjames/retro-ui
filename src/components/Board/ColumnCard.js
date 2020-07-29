/* eslint jsx-a11y/anchor-is-valid:0 */

import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ColumnCard = (props) => {
  const handleDelete = (event) => {
    props.deleteCard(props.card);
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

  const onChange = (event) => {
    setUpdatedCard({ ...updatedCard, [event.target.name]: event.target.value });
  };

  const [editable, setEditable] = useState(false);
  const [updatedCard, setUpdatedCard] = useState(props.card);
  const { user } = useAuth0();

  if (!editable) {
    return (
      <div className="card card-white-bg is-size-6-7">
        <div className="card-content py-4 px-4">
          <div className="columns">
            <div className="column py-1 px-1 my-1 mx-1">
              <div className="columns is-vcentered mb-0">
                <div className="column is-narrow pr-0 is-hidden-mobile">
                  <p className="image is-32x32">
                    <img
                      className="is-rounded"
                      src={props.card.picture}
                      alt={props.card.nickName}
                    />
                  </p>
                </div>
                <div className="column is-narrow">
                  <p>
                    <strong className="is-capitalized">
                      {props.card.nickName}
                    </strong>
                  </p>
                </div>
              </div>
              <p>{props.card.text}</p>
              <div>
                {user.sub === props.card.userId ? (
                  <>
                    <a
                      className="mr-2"
                      onClick={() => {
                        setEditable(true);
                        props.setDragDisabled(true);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </a>
                    <a className="mr-2" onClick={handleDelete}>
                      <i className="fas fa-trash-alt"></i>
                    </a>
                  </>
                ) : null}
                <a>
                  <i className="fas fa-thumbs-up"></i>
                </a>
              </div>
            </div>
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
