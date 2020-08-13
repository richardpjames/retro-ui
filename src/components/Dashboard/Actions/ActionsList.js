import React from 'react';
import ActionsCard from './ActionsCard';

const ActionsList = (props) => {
  return (
    <div>
      {props.actions.length === 0 && (
        <p>There are currently no actions to show.</p>
      )}
      {props.actions.map((action) => (
        <ActionsCard
          action={action}
          key={action._id}
          updateAction={props.updateAction}
          profile={props.profile}
        />
      ))}
    </div>
  );
};

export default ActionsList;
