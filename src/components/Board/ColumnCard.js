import React from "react";
import {Draggable} from "react-beautiful-dnd";

const ColumnCard = (props) => {
  return <div className="card">
    <div className="card-content">
      <p>{props.card.text}</p>
    </div>
  </div>
}

export default ColumnCard;
