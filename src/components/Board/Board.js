import React from 'react';
import ColumnHeading from './ColumnHeading';
import BoardColumn from './BoardColumn';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NewCardForm from './NewCardForm';
import ActionsColumn from './ActionsColumn';

const Board = (props) => {
  return (
    <>
      <DragDropContext onDragEnd={props.handleDragEnd} isCombineEnabled>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="columns board-columns box has-background-white-ter px-3 py-3"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.columns.map((column, index) => (
                <Draggable
                  draggableId={column._id}
                  index={index}
                  key={column._id}
                  isDragDisabled={
                    props.board.userid !== props.profile.userid ||
                    props.board.locked
                  }
                >
                  {(dragProvided, snapshot) => (
                    <div
                      key={column._id}
                      className="box column board-column mx-1 my-1"
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                    >
                      <ColumnHeading
                        columns={props.columns}
                        column={column}
                        board={props.board}
                        cards={props.cards}
                        profile={props.profile}
                        deleteColumn={props.deleteColumn}
                        dragHandleProps={dragProvided.dragHandleProps}
                        renameColumn={props.renameColumn}
                      />

                      {!props.board.locked && (
                        <NewCardForm addCard={props.addCard} column={column} />
                      )}

                      <Droppable droppableId={column._id} isCombineEnabled>
                        {(dropProvided) => (
                          <div
                            className="is-fullheight"
                            ref={dropProvided.innerRef}
                            {...dropProvided.droppableProps}
                          >
                            <BoardColumn
                              board={props.board}
                              updateCard={props.updateCard}
                              addVote={props.addVote}
                              deleteVote={props.deleteVote}
                              cards={props.cards.filter(
                                (c) => c.columnId === column._id,
                              )}
                              deleteCard={props.deleteCard}
                              votes={props.votes}
                              votesRemaining={props.votesRemaining}
                              profile={props.profile}
                              setCardToSeparate={props.setCardToSeparate}
                              setIndexToSeparate={props.setIndexToSeparate}
                              setSeparateCardModalVisible={
                                props.setSeparateCardModalVisible
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
                profile={props.profile}
                actions={props.actions}
                addAction={props.addAction}
                deleteAction={props.deleteAction}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
