import React from 'react';
import ColumnCard from './ColumnCard';
import { Draggable } from 'react-beautiful-dnd';

const BoardColumn = (props) => {
  return (
    <>
      {props.cards.map((card, index) => (
        <Draggable
          key={card.cardid}
          draggableId={`car-${card.cardid.toString()}`}
          index={index}
          isDragDisabled={props.board.locked}
        >
          {(drag2Provided, drag2snapshot) => (
            <div
              ref={drag2Provided.innerRef}
              {...drag2Provided.draggableProps}
              {...drag2Provided.dragHandleProps}
              className="my-2"
            >
              <ColumnCard
                updateCard={props.updateCard}
                addVote={props.addVote}
                deleteVote={props.deleteVote}
                card={card}
                board={props.board}
                deleteCard={props.deleteCard}
                votes={props.votes.filter(
                  (vote) => vote.cardid === card.cardid,
                )}
                votesRemaining={props.votesRemaining}
                profile={props.profile}
                setCardToSeparate={props.setCardToSeparate}
                setIndexToSeparate={props.setIndexToSeparate}
                setSeparateCardModalVisible={props.setSeparateCardModalVisible}
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
