import React from 'react';
import CreateActionForm from './CreateActionForm';
import ActionCard from './ActionCard';

const ActionsColumn = (props) => {
  if (props.data.board.showactions) {
    return (
      <>
        <div className="column rounded shadow-inner bg-gray-200 mx-1 my-1">
          <h4 className="subtitle is-4 ml-0 mr-3 mb-3 mt-0">Actions</h4>
          {props.data.profile.userid === props.data.board.userid && (
            <>{!props.data.board.locked && <CreateActionForm {...props} />}</>
          )}
          {props.data.actions.map((action) => (
            <ActionCard {...props} key={action.actionid} action={action} />
          ))}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default ActionsColumn;
