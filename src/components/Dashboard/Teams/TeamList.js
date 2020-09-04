import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TeamCard from './TeamCard.js';
import DeleteTeamModal from './DeleteTeamModal.js';

const TeamList = (props) => {
  // Get the user profile
  const profile = useSelector((state) => state.profile);
  // Get the list of teams for this user from redux
  const teams = useSelector((state) =>
    state.teams.filter((team) => team.userid === profile.userid),
  );

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
            teams={teams}
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
