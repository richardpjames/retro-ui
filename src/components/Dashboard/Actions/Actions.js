import React from 'react';
import ActionsList from './ActionsList';

const Actions = (props) => {
  return (
    <>
      <div className="content mx-5 my-5">
        <h1 className="title is-1 mt-3">Actions</h1>
        <p className="mt-0">
          These are the actions raised from past retrospectives.
        </p>
        <h1 className="title is-2 mt-5">Open</h1>
        <ActionsList
          actions={props.actions.filter((action) => action.status !== 'closed')}
          updateAction={props.updateAction}
          profile={props.profile}
        />
        <h1 className="title is-2 mt-5">Closed</h1>
        <ActionsList
          actions={props.actions.filter((action) => action.status === 'closed')}
          updateAction={props.updateAction}
          profile={props.profile}
        />
      </div>
    </>
  );
};

export default Actions;
