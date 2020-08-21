import React from 'react';
import NewTeamModal from './NewTeamModal';
import TeamList from './TeamList';
import MembershipList from './MembershipList';
import LeaveTeamModal from './LeaveTeamModal';
import RemoveTeamMemberModal from './RemoveTeamMemberModal';
import Icon from '../../Common/Icon';

const Teams = (props) => {
  return (
    <div className="content mx-5 my-5">
      <RemoveTeamMemberModal
        visible={props.removeTeamMemberModalVisible}
        setModalVisible={props.setRemoveTeamMemberModalVisible}
        setTeamMemberToRemove={props.setTeamMemberToRemove}
        teamMemberToRemove={props.teamMemberToRemove}
        removeTeamMember={props.removeTeamMember}
      />
      <LeaveTeamModal
        visible={props.leaveTeamModalVisible}
        setModalVisible={props.setLeaveTeamModalVisible}
        team={props.teamToLeave}
        removeMembership={props.removeMembership}
      />
      {props.pendingTeams > 0 ? (
        <div className="notification is-primary">
          <Icon class="fas fa-exclamation-triangle" padding />
          You have outstanding invitations to new teams, please accept or
          decline these invitations from the Membership section of this screen.
        </div>
      ) : null}
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
            <Icon class="fas fa-plus" padding /> Create New
          </button>
        </div>
      </div>
      <p className="mt-0">
        View an existing team, or create a new one. Teams are shown
        alphabetically.
      </p>
      <NewTeamModal
        teams={props.teams.filter((team) => team.userId === props.profile._id)}
        profile={props.profile}
        addTeam={props.addTeam}
        visible={props.createTeamModalVisible}
        setVisible={props.setCreateTeamModalVisible}
      />
      <div className="content">
        <TeamList
          teams={props.teams.filter(
            (team) => team.userId === props.profile._id,
          )}
          profile={props.profile}
          removeTeam={props.removeTeam}
          addTeamMember={props.addTeamMember}
          removeTeamMember={props.removeTeamMember}
          setTeamMemberToRemove={props.setTeamMemberToRemove}
          setRemoveTeamMemberModalVisible={
            props.setRemoveTeamMemberModalVisible
          }
        />
        <div>
          <h1 className="title is-2 mt-5">Memberships</h1>
          <p className="mt-0">
            You are also the member of the following teams created by other
            users.
          </p>
        </div>
        <MembershipList
          teams={props.teams.filter(
            (team) => team.userId !== props.profile._id,
          )}
          removeMembership={props.removeMembership}
          acceptMembership={props.acceptMembership}
          setLeaveTeamModalVisible={props.setLeaveTeamModalVisible}
          setTeamToLeave={props.setTeamToLeave}
          profile={props.profile}
        />
      </div>
    </div>
  );
};

export default Teams;
