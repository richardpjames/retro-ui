import React from 'react';
import ColumnCard from './ColumnCard';
import { Draggable } from 'react-beautiful-dnd';

const BoardColumn = (props) => {
  return (
    <>
      {props.data.cards
        .filter((c) => !c.parentid && c.columnid === props.column.columnid)
        .map((card, index) => (
          <Draggable
            key={card.cardid}
            draggableId={`car-${card.cardid.toString()}`}
            index={index}
            isDragDisabled={props.data.board.locked}
          >
            {(drag2Provided, drag2snapshot) => (
              <div
                ref={drag2Provided.innerRef}
                {...drag2Provided.draggableProps}
                {...drag2Provided.dragHandleProps}
                className="my-2"
              >
                <ColumnCard
                  {...props}
                  card={card}
                  votes={props.data.votes.filter(
                    (vote) => vote.cardid === card.cardid,
                  )}
                  snapshot={drag2snapshot}
                />
              </div>
            )}
          </Draggable>
        ))}
    </>
  );
};

export default BoardColumn;
