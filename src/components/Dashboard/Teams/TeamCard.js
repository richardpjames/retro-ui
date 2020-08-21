import React, { useState } from 'react';
import moment from 'moment';

const TeamCard = (props) => {
  const [email, setEmail] = useState('');

  const toggleModal = () => {
    props.setTeamToDelete(props.team);
    props.setModalVisible(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTeamMember(props.team._id, email);
    setEmail('');
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
              <i className="fas fa-trash-alt mr-3"></i> Delete Team
            </button>
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <div className="columns">
            <div className="column">
              <div className="field">
                <input
                  type="email"
                  className="input"
                  id="email"
                  placeholder="e.g. richard@retrospectacle.io"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value.toLowerCase())
                  }
                  required
                />
              </div>
            </div>
            <div className="column is-narrow">
              <div className="buttons">
                <button className="button is-primary">
                  <i className="fas fa-plus mr-3"></i> Add Team Member
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>
        {props.team.members && props.team.members.length >= 1 ? (
          <h2 className="title is-5 mt-5">Team Members</h2>
        ) : null}
        {props.team.members
          ? props.team.members.map((member) => {
              return (
                <div key={member.email}>
                  <div className="columns is-vcentered">
                    <div className="column is-narrow">
                      <div className="buttons">
                        <button
                          className="button is-danger"
                          onClick={() => {
                            props.setTeamMemberToRemove({
                              teamId: props.team._id,
                              email: member.email,
                            });
                            props.setRemoveTeamMemberModalVisible(true);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                    <div className="column">
                      {member.email} (
                      <span className="is-capitalized">{member.status}</span>)
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default TeamCard;
