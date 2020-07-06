import React from "react";

const ColumnCard = (props) => {
  return <div className="card">
    <div className="card-content">
      <p>{props.card.text}</p>
    </div>
  </div>
}

export default ColumnCard;
