/* eslint jsx-a11y/anchor-is-valid:0 */

import React from "react";

const ColumnCard = (props) => {

  const handleClick = (event) => {
    props.deleteCard(props.card);
  }

  return <div className="card card-white-bg">
    <div className="card-content">
      <div className="columns">
        <div className="column">
          <div class="media">
            <div class="media-left">
              <img src="https://via.placeholder.com/50"/>
            </div>
            <div class="media-content">
              <p>{props.card.text}</p>
              <div>
                <a className="mr-2"><i className="fas fa-pencil-alt"></i></a>
                <a><i className="fas fa-thumbs-up"></i></a>
              </div>
            </div>
            <div className="media-right">
              <button onClick={handleClick} className="delete"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default ColumnCard;
