import React from 'react';
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
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="my-2"
            >
              <ColumnCard
                updateCard={props.updateCard}
                addVote={props.addVote}
                deleteVote={props.deleteVote}
                setDragDisabled={props.setDragDisabled}
                card={card}
                votes={props.votes.filter((vote) => vote.cardId === card._id)}
                votesRemaining={props.votesRemaining}
                profile={props.profile}
                setCardToDelete={props.setCardToDelete}
                setDeleteCardModalVisible={props.setDeleteCardModalVisible}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default BoardColumn;
