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
        <div className="buttons">
          <a
            className="button is-small is-outlined is-danger"
            onClick={handleDelete}
          >
            <i className="fas fa-trash-alt"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
