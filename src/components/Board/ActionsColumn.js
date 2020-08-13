import React from 'react';
import CreateActionForm from './CreateActionForm';
import ActionCard from './ActionCard';

const ActionsColumn = (props) => {
  if (props.board.showActions) {
    return (
      <>
        <div className="column card mx-1 my-1">
          <h4 className="subtitle is-4 ml-0 mr-3 mb-3 mt-0">Actions</h4>
          <CreateActionForm
            board={props.board}
            profile={props.profile}
            addAction={props.addAction}
          />
          {props.actions.map((action) => (
            <ActionCard
              key={action._id}
              action={action}
              board={props.board}
              profile={props.profile}
              setActionToDelete={props.setActionToDelete}
              setDeleteActionModalVisible={props.setDeleteActionModalVisible}
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
