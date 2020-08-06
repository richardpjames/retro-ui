import React from 'react';
import MembershipCard from './MembershipCard';

const MembershipList = (props) => {
  return (
    <>
      {props.teams.map((team) => (
        <div className="my-3" key={team._id}>
          <MembershipCard
            team={team}
            removeMembership={props.removeMembership}
            acceptMembership={props.acceptMembership}
            setLeaveTeamModalVisible={props.setLeaveTeamModalVisible}
            setTeamToLeave={props.setTeamToLeave}
            profile={props.profile}
          />
        </div>
      ))}
    </>
  );
};

export default MembershipList;
