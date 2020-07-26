import React, { useState } from 'react';
import ColumnCard from './ColumnCard';
import { Draggable } from 'react-beautiful-dnd';

const BoardColumn = (props) => {
  return (
    <>
      {props.cards.map((card, index) => (
        <Draggable
          key={card._id}
          draggableId={card._id}
          index={index}
          isDragDisabled={props.dragDisabled}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="my-3"
            >
              <ColumnCard
                deleteCard={props.deleteCard}
                updateCard={props.updateCard}
                setDragDisabled={props.setDragDisabled}
                card={card}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default BoardColumn;
