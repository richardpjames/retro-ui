import React from 'react';
import moment from 'moment';

const TeamCard = (props) => {
  const toggleModal = () => {
    props.setTeamToDelete(props.team);
    props.setModalVisible(true);
  };

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
            <button className="button is-danger" onClick={toggleModal}>
              <i className="fas fa-trash-alt mr-3"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
