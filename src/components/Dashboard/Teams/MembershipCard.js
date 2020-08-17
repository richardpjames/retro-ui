import React from 'react';
import moment from 'moment';
import Icon from '../../Common/Icon';

const MembershipCard = (props) => {
  const getStatus = () => {
    let _membership;
    if (props.team.members) {
      _membership = props.team.members.find(
        (member) => member.email === props.profile.email,
      );
    }
    if (_membership && _membership.status) {
      return _membership.status;
    }
    return '';
  };

  return (
    <div className="box">
      <div className="columns is-vcentered">
        <div className="column">
          <h5 className="title is-5 mb-0">
            {props.team.name} (
            <span className="is-capitalized">{getStatus()}</span>)
          </h5>
          <p className="is-size-7">
            Created {moment(props.team.created).format('DD/MM/YYYY HH:mm')}
          </p>
        </div>
        <div className="column is-narrow">
          <div className="buttons">
            {getStatus() !== 'accepted' ? (
              <button
                className="button is-primary"
                onClick={() => props.acceptMembership(props.team._id)}
              >
                <Icon class="fas fa-user-plus" padding /> Accept Invitation
              </button>
            ) : null}
            <button
              className="button is-danger"
              onClick={() => {
                props.setTeamToLeave(props.team);
                props.setLeaveTeamModalVisible(true);
              }}
            >
              <Icon class="fas fa-sign-out-alt" padding /> Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
