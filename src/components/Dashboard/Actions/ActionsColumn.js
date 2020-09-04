import React from 'react';
import LoadingSpinner from '../../Common/LoadingSpinner';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import ActionsCard from './ActionsCard';
import { getActionsForStatus } from '../../../redux/selectors/actionSelectors';

const ActionsColumn = (props) => {
  // Get the actions for this column
  const actions = useSelector((state) =>
    getActionsForStatus(props.status)(state),
  );

  return (
    <>
      <h4 className="title is-4 mb-5">{props.title}</h4>
      <LoadingSpinner />
      {actions.map((action, index) => (
        <Draggable
          key={action.actionid}
          draggableId={action.actionid.toString()}
          index={index}
          isDragDisabled={props.dragDisabled}
        >
          {(dragProvided, snapshot) => (
            <div
              ref={dragProvided.innerRef}
              {...dragProvided.draggableProps}
              {...dragProvided.dragHandleProps}
            >
              <ActionsCard
                action={action}
                setDragDisabled={props.setDragDisabled}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};

export default ActionsColumn;
