import React from 'react';
import ColumnCard from './ColumnCard';
import { Draggable } from 'react-beautiful-dnd';

const BoardColumn = (props) => {
  return (
    <>
      {props.cards.map((card, index) => (
        <Draggable key={card._id} draggableId={card._id} index={index}>
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
                votes={props.votes.filter((vote) => vote.cardId === card._id)}
                votesRemaining={props.votesRemaining}
                profile={props.profile}
                setCardToDelete={props.setCardToDelete}
                setDeleteCardModalVisible={props.setDeleteCardModalVisible}
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
