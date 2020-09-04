import React, { useEffect, useState } from 'react';
import { LexoRank } from 'lexorank';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ActionsColumn from './ActionsColumn';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadActions,
  updateAction,
} from '../../../redux/actions/actionActions';
import { getSortedActions } from '../../../redux/selectors/actionSelectors';

const Actions = (props) => {
  // For disabling drag (when modals are open)
  const [dragDisabled, setDragDisabled] = useState(false);
  // Get all of the actions
  const actions = useSelector((state) => getSortedActions()(state));
  // Get the dispatch
  const dispatch = useDispatch();
  // Load all actions on page load
  useEffect(() => {
    dispatch(loadActions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For dealing with the drag end
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return null;
    }
    // Find the affected action from the list
    const action = actions.find(
      (action) => action.actionid === parseInt(result.draggableId),
    );

    // A variable for the new rank
    let newRank = LexoRank.middle().toString();
    // For ordering and ranking find the actions in the status that the action was dragged to
    const columnActions = actions.filter(
      (a) => a.status === destination.droppableId,
    );
    // If there is nothing in the column already then no action required
    // Otherwise set the new rank based on the existing action it replaces
    if (columnActions.length > 0) {
      let lowerRank = LexoRank.min();
      let higherRank = LexoRank.max();
      // If moving down the same list then the logic is slightly different
      if (
        source.droppableId === destination.droppableId &&
        source.index < destination.index
      ) {
        // If this isn't bottom top of the list then we can adjust the lower
        lowerRank = LexoRank.parse(columnActions[destination.index].rank);
        // The higher will replace the existing card that we slip above
        if (destination.index < columnActions.length - 1)
          higherRank = LexoRank.parse(
            columnActions[destination.index + 1].rank,
          );
      } else {
        // If this isn't the top of the list then we can adjust the lower
        if (destination.index > 0)
          lowerRank = LexoRank.parse(columnActions[destination.index - 1].rank);
        // The higher will replace the existing card that we slip above
        if (destination.index <= columnActions.length - 1)
          higherRank = LexoRank.parse(columnActions[destination.index].rank);
      }
      newRank = lowerRank.between(higherRank).toString();
    }
    // If the new columns is closed (and the card was not already closed) then update the action closed date
    if (result.destination.droppableId === 'complete' && !action.closed) {
      action.closed = new Date();
    } else {
      delete action.closed;
    }
    // Update the status based on the column dropped
    action.rank = newRank;
    action.status = result.destination.droppableId;
    // Make the change via redux
    dispatch(updateAction(action));
  };

  return (
    <>
      <div className="columns is-centered">
        <div className="column is-12 is-10-widescreen">
          <div className="box">
            <h3 className="title is-3 ">Action Center</h3>
            <h6 className="subtitle is-6 ml-1">
              These are the actions that have been raised from your
              retrospectives. You can drag them between the columns as they
              progress and add additional updates by clicking on "Show Details".{' '}
              {actions.length === 0 && (
                <span>
                  You do not currently have any actions. Actions are created
                  from your boards when running a retrospective.
                </span>
              )}
            </h6>
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="columns mt-5">
                <div className="column">
                  <Droppable droppableId="todo">
                    {(dropProvided) => (
                      <div
                        className="box"
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                      >
                        <ActionsColumn
                          status="todo"
                          title="To Do"
                          dragDisabled={dragDisabled}
                          setDragDisabled={setDragDisabled}
                        />
                        {dropProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <div className="column">
                  <Droppable droppableId="progress">
                    {(dropProvided) => (
                      <div
                        className="box"
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                      >
                        <ActionsColumn
                          status="progress"
                          title="In Progress"
                          dragDisabled={dragDisabled}
                          setDragDisabled={setDragDisabled}
                        />
                        {dropProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                <div className="column">
                  <Droppable droppableId="complete">
                    {(dropProvided) => (
                      <div
                        className="box"
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                      >
                        <ActionsColumn
                          status="complete"
                          title="Done"
                          dragDisabled={dragDisabled}
                          setDragDisabled={setDragDisabled}
                        />
                        {dropProvided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Actions;
