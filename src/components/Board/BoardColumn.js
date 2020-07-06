import React from "react";
import ColumnCard from "./ColumnCard";
import {Draggable} from "react-beautiful-dnd"

const BoardColumn = (props) => {
  return (
    <>
      {
        props.cards.map((card, index) => (
          <Draggable key={card.cardId} draggableId={card.cardId} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="my-3"
              >
                <ColumnCard deleteCard={props.deleteCard} card={card}/>
              </div>
            )}
          </Draggable>
        ))
      }
    </>
  );
}

export default BoardColumn
