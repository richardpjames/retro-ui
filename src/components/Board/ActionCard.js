/* eslint jsx-a11y/anchor-is-valid:0 */
import React, { useState } from 'react';
import moment from 'moment';

const ActionCard = (props) => {
  const [showEditControls, setShowEditControls] = useState(false);

  const handleDelete = () => {
    setShowEditControls(false);
    props.setActionToDelete(props.action);
    props.setDeleteActionModalVisible(true);
  };

  return (
    <div className="card card-white-bg is-size-6-7 mb-2">
      <div className="card-content py-4 px-4">
        <p>
          <strong className="is-capitalized">{props.action.owner}</strong> -{' '}
          {props.action.text}
          <strong> by {moment(props.action.due).format('DD/MM/YYYY')}</strong>
        </p>
        {props.board.userId === props.profile.id && (
          <div className="has-text-right">
            <span className="tag is-rounded">
              <a
                className="is-small"
                onClick={() => setShowEditControls(!showEditControls)}
              >
                <i className="fas fa-ellipsis-h"></i>
              </a>
            </span>

            {showEditControls && (
              <div className="buttons mt-3">
                <a
                  className="button is-small is-fullwidth is-danger"
                  onClick={handleDelete}
                >
                  <i className="fas fa-trash-alt mr-3"></i>Delete
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionCard;
