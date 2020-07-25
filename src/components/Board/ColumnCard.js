/* eslint jsx-a11y/anchor-is-valid:0 */

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ColumnCard = (props) => {
  const handleClick = (event) => {
    props.deleteCard(props.card);
  };
  const { user } = useAuth0();

  return (
    <div className="card card-white-bg">
      <div className="card-content">
        <div className="columns">
          <div className="column py-1 px-1 my-1 mx-1">
            <div className="media">
              <div className="media-left">
                <p className="image is-64x64">
                  <img
                    className="is-rounded"
                    src={props.card.picture}
                    alt={props.card.nickName}
                  />
                </p>
              </div>
              <div className="media-content">
                <p>
                  <strong className="nickname">{props.card.nickName}</strong>
                  <br />
                  {props.card.text}
                </p>
                <div>
                  <a className="mr-2">
                    <i className="fas fa-pencil-alt"></i>
                  </a>
                  <a>
                    <i className="fas fa-thumbs-up"></i>
                  </a>
                </div>
              </div>
              <div className="media-right">
                {(() => {
                  if (user.sub === props.card.userId)
                    return (
                      <button onClick={handleClick} className="delete"></button>
                    );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnCard;
