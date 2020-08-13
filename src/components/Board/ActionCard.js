/* eslint jsx-a11y/anchor-is-valid:0 */
import React from 'react';
import moment from 'moment';

const ActionCard = (props) => {
  const handleDelete = () => {
    props.setActionToDelete(props.action);
    props.setDeleteActionModalVisible(true);
  };

  return (
    <div className="card card-white-bg is-size-6-7 mb-2">
      <div className="card-content py-4 px-4">
        <p>
          <strong className="is-capitalized">{props.action.owner}</strong> to{' '}
          {props.action.text}
          <strong> by {moment(props.action.due).format('DD/MM/YYYY')}</strong>
        </p>
        {props.board.userId === props.profile.id && (
          <div className="has-text-right">
            <div className="dropdown is-right is-hoverable">
              <div className="dropdown-trigger">
                <span className="tag is-rounded">
                  <a
                    className="is-small"
                    aria-haspopup="true"
                    aria-controls={`dropdown-action-${props.action._id}`}
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </a>
                </span>
              </div>
              <div
                className="dropdown-menu"
                id={`dropdown-action-${props.action._id}`}
                role="menu"
              >
                <div className="dropdown-content">
                  <div className="dropdown-item">
                    <a
                      className="button is-small is-fullwidth is-danger"
                      onClick={handleDelete}
                    >
                      <i className="fas fa-trash-alt mr-3"></i>Delete Action
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionCard;
