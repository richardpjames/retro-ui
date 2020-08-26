/* eslint jsx-a11y/anchor-is-valid:0 */
import React, { useState } from 'react';
import moment from 'moment';
import Icon from '../Common/Icon';

const ActionCard = (props) => {
  const [showEditControls, setShowEditControls] = useState(false);

  return (
    <div className="box card-white-bg is-size-6-7 px-1 py-1 mb-2">
      <div className="card-content py-4 px-4">
        <p>
          <strong className="is-capitalized">{props.action.owner}</strong> -{' '}
          {props.action.text}
          <strong> by {moment(props.action.due).format('DD/MM/YYYY')}</strong>
        </p>
        {props.data.board.userid === props.data.profile.userid &&
          !props.data.board.locked && (
            <div className="has-text-right">
              <span className="tag is-rounded">
                <a
                  className="is-small"
                  onClick={() => setShowEditControls(!showEditControls)}
                >
                  <Icon class="fas fa-ellipsis-h" />
                </a>
              </span>

              {showEditControls && (
                <div className="buttons mt-3">
                  <a
                    className="button is-small is-fullwidth is-danger"
                    onClick={() => {
                      props.controllers.modalsController.showModal({
                        title: 'Delete Action',
                        message:
                          'Are you sure that you want to delete this action?',
                        action: 'Delete',
                        function: () => {
                          props.controllers.actionsController.deleteAction(
                            props.action,
                          );
                        },
                        danger: true,
                      });
                    }}
                  >
                    <Icon class="fas fa-trash-alt" padding />
                    Delete
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
