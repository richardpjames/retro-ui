import React, { useState } from 'react';
import TeamCard from './TeamCard.js';
import DeleteTeamModal from './DeleteTeamModal.js';

const TeamList = (props) => {
  const [teamToDelete, setTeamToDelete] = useState({
    teamid: '',
    name: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <DeleteTeamModal
        team={teamToDelete}
        removeTeam={props.removeTeam}
        visible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {props.teams.map((team) => (
        <div className="my-3" key={team.teamid}>
          <TeamCard
            teams={props.teams}
            team={team}
            profile={props.profile}
            setModalVisible={setModalVisible}
            setTeamToDelete={setTeamToDelete}
            addTeamMember={props.addTeamMember}
            removeTeamMember={props.removeTeamMember}
            setTeamMemberToRemove={props.setTeamMemberToRemove}
            setRemoveTeamMemberModalVisible={
              props.setRemoveTeamMemberModalVisible
            }
          />
        </div>
      ))}
    </div>
  );
};

export default TeamList;
