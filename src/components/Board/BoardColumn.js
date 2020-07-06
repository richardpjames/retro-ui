import React from "react";
import ColumnCard from "./ColumnCard";
import {Draggable} from "react-beautiful-dnd"

const BoardColumn = (props) => {
  return (
    <div className="card column-card">
      <div className="card-content">
        <h5 className="subtitle is-5">{props.column.title}</h5>
        {
          props.column.cards.map((card, index) => (
            <Draggable key={card.cardId} draggableId={card.cardId} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="my-3"
                >
                  <ColumnCard card={card}/>
                </div>
              )}
            </Draggable>
          ))
        }
      </div>
    </div>
  );
}

export default BoardColumn
