import React from 'react';
import CreateActionForm from './CreateActionForm';
import ActionCard from './ActionCard';

const ActionsColumn = (props) => {
  if (props.board.showActions) {
    return (
      <>
        <div className="column box mx-1 my-1">
          <h4 className="subtitle is-4 ml-0 mr-3 mb-3 mt-0">Actions</h4>
          {props.profile._id === props.board.userId && (
            <>
              {!props.board.locked && (
                <CreateActionForm
                  board={props.board}
                  profile={props.profile}
                  addAction={props.addAction}
                />
              )}
            </>
          )}
          {props.actions.map((action) => (
            <ActionCard
              key={action._id}
              action={action}
              board={props.board}
              profile={props.profile}
              deleteAction={props.deleteAction}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ActionsColumn;
