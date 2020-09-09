import React from 'react';
import ColumnHeading from './ColumnHeading';
import BoardColumn from './BoardColumn';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import NewCardForm from './NewCardForm';
import ActionsColumn from './ActionsColumn';

const Board = (props) => {
  return (
    <>
      <DragDropContext
        onDragEnd={props.controllers.dragDropController.handleDragEnd}
        isCombineEnabled
      >
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              className="columns board-columns mx-0 my-0 px-0 py-0"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.data.columns.map((column, index) => (
                <Draggable
                  draggableId={`col-${column.columnid.toString()}`}
                  index={index}
                  key={column.columnid}
                  isDragDisabled={
                    props.data.board.userid !== props.data.profile.userid ||
                    props.data.board.locked
                  }
                >
                  {(dragProvided, snapshot) => (
                    <div
                      key={column.columnid}
                      className="bg-gray-200 rounded shadow-inner column board-column mx-1 my-1"
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                    >
                      <ColumnHeading
                        {...props}
                        column={column}
                        dragHandleProps={dragProvided.dragHandleProps}
                      />

                      {!props.data.board.locked && (
                        <NewCardForm {...props} column={column} />
                      )}

                      <Droppable
                        droppableId={column.columnid.toString()}
                        isCombineEnabled
                      >
                        {(dropProvided) => (
                          <div
                            className="is-fullheight"
                            ref={dropProvided.innerRef}
                            {...dropProvided.droppableProps}
                          >
                            <BoardColumn {...props} column={column} />
                            {dropProvided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <ActionsColumn {...props} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
