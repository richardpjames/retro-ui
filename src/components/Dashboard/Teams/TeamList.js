import React, { useState } from 'react';
import TeamCard from './TeamCard.js';
import DeleteTeamModal from './DeleteTeamModal.js';

const TeamList = (props) => {
  const [teamToDelete, setTeamToDelete] = useState({
    _id: '',
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
        <div className="my-3" key={team._id}>
          <TeamCard
            team={team}
            setModalVisible={setModalVisible}
            setTeamToDelete={setTeamToDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamList;
