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
          <p>{props.card.text}</p>
        </div>
        <div className="column is-narrow">
          <a onClick={handleClick}><i className="fas fa-trash-alt"></i></a>
        </div>
      </div>
    </div>
  </div>
}

export default ColumnCard;
