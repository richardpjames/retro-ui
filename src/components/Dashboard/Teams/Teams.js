import React from 'react';
import NewTeamModal from './NewTeamModal';
import TeamList from './TeamList';
import MembershipList from './MembershipList';
import LoadingSpinner from '../../Common/LoadingSpinner';

const Teams = (props) => {
  return (
    <div className="content mx-5 my-5">
      <div className="columns is-vcentered mb-0">
        <div className="column py-0">
          <h1 className="title is-1 mt-3">Teams</h1>
        </div>
        <div className="column py-0 is-narrow">
          <button
            className="button is-primary"
            onClick={() => {
              props.setCreateTeamModalVisible(true);
            }}
          >
            <i className="fas fa-plus mr-3"></i> Create New
          </button>
        </div>
      </div>
      <p className="mt-0">
        View an existing team, or create a new one. Teams are shown
        alphabetically.
      </p>
      <NewTeamModal
        teams={props.teams.filter((team) => team.userId === props.profile.id)}
        profile={props.profile}
        addTeam={props.addTeam}
        visible={props.createTeamModalVisible}
        setVisible={props.setCreateTeamModalVisible}
      />
      <div className="content">
        <TeamList
          teams={props.teams.filter((team) => team.userId === props.profile.id)}
          profile={props.profile}
          removeTeam={props.removeTeam}
          addTeamMember={props.addTeamMember}
          removeTeamMember={props.removeTeamMember}
        />
        <div>
          <h1 className="title is-2 mt-5">Memberships</h1>
          <p className="mt-0">
            You are also the member of the following teams created by other
            users.
          </p>
        </div>
        <MembershipList
          teams={props.teams.filter((team) => team.userId !== props.profile.id)}
          removeMembership={props.removeMembership}
          acceptMembership={props.acceptMembership}
          profile={props.profile}
        />
      </div>
    </div>
  );
};

export default Teams;
