import React from 'react';
import moment from 'moment';

const MembershipCard = (props) => {
  return (
    <div className="box">
      <div className="columns is-vcentered">
        <div className="column">
          <h5 className="title is-5 mb-0">{props.team.name}</h5>
          <p className="is-size-7">
            Created {moment(props.team.created).format('DD/MM/YYYY HH:mm')}
          </p>
        </div>
        <div className="column is-narrow">
          <div className="buttons">
            <button
              className="button is-danger"
              onClick={() => props.removeMembership(props.team._id)}
            >
              <i className="fas fa-sign-out-alt mr-3"></i> Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
