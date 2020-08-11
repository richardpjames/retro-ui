import React from 'react';
import NewColumnControl from './NewColumnControl';
import ColumnHeading from './ColumnHeading';
import BoardColumn from './BoardColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NewCardForm from './NewCardForm';

const Board = (props) => {
  return (
    <>
      <div className="columns board-columns">
        <DragDropContext onDragEnd={props.handleDragEnd}>
          {props.columns.map((column, index) => (
            <div
              key={column._id}
              className="card column board-column mx-1 my-1"
            >
              <ColumnHeading
                columns={props.columns}
                column={column}
                board={props.board}
                cards={props.cards}
                profile={props.profile}
                moveColumn={props.moveColumn}
                setColumnToDelete={props.setColumnToDelete}
                setDeleteColumnModalVisible={props.setDeleteColumnModalVisible}
              />

              <NewCardForm addCard={props.addCard} column={column} />

              <Droppable droppableId={column._id}>
                {(provided) => (
                  <div
                    className="is-fullheight"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <BoardColumn
                      updateCard={props.updateCard}
                      addVote={props.addVote}
                      deleteVote={props.deleteVote}
                      dragDisabled={props.dragDisabled}
                      setDragDisabled={props.setDragDisabled}
                      cards={props.cards.filter(
                        (c) => c.columnId === column._id,
                      )}
                      votes={props.votes}
                      votesRemaining={props.votesRemaining}
                      profile={props.profile}
                      setCardToDelete={props.setCardToDelete}
                      setDeleteCardModalVisible={
                        props.setDeleteCardModalVisible
                      }
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>

        <NewColumnControl
          board={props.board}
          profile={props.profile}
          setCreateColumnModalVisible={props.setCreateColumnModalVisible}
        />
      </div>
    </>
  );
};

export default Board;
