import React from 'react';
import ActionsCard from './ActionsCard';

const ActionsList = (props) => {
  return (
    <div className="box has-background-white-ter">
      {props.actions.length === 0 && (
        <p>There are currently no actions to show.</p>
      )}
      {props.actions.map((action) => (
        <ActionsCard
          action={action}
          key={action.actionid}
          updateAction={props.updateAction}
          addActionUpdate={props.addActionUpdate}
          removeActionUpdate={props.removeActionUpdate}
          profile={props.profile}
        />
      ))}
    </div>
  );
};

export default ActionsList;
