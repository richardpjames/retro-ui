import React from 'react';
import ColumnHeading from './ColumnHeading';
import BoardColumn from './BoardColumn';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NewCardForm from './NewCardForm';
import ActionsColumn from './ActionsColumn';

const Board = (props) => {
  return (
    <>
      <DragDropContext onDragEnd={props.handleDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="columns board-columns"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.columns.map((column, index) => (
                <Draggable
                  draggableId={column._id}
                  index={index}
                  key={column._id}
                  isDragDisabled={props.board.userId !== props.profile.id}
                >
                  {(provided, snapshot) => (
                    <div
                      key={column._id}
                      className="card column board-column mx-1 my-1"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <ColumnHeading
                        columns={props.columns}
                        column={column}
                        board={props.board}
                        cards={props.cards}
                        profile={props.profile}
                        setColumnToDelete={props.setColumnToDelete}
                        setDeleteColumnModalVisible={
                          props.setDeleteColumnModalVisible
                        }
                        dragHandleProps={provided.dragHandleProps}
                        renameColumn={props.renameColumn}
                      />

                      <NewCardForm addCard={props.addCard} column={column} />

                      <Droppable droppableId={column._id}>
                        {(dropProvided, dropSnapshot) => (
                          <div
                            className="is-fullheight"
                            ref={dropProvided.innerRef}
                            {...dropProvided.droppableProps}
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
                            {dropProvided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <ActionsColumn
                board={props.board}
                actions={props.actions}
                addAction={props.addAction}
                setActionToDelete={props.setActionToDelete}
                setDeleteActionModalVisible={props.setDeleteActionModalVisible}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
