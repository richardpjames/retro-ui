import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadMembers,
  updateMember,
} from '../../../redux/actions/memberActions';
import { loadTeam } from '../../../redux/actions/teamActions';
import LeaveTeamModal from './LeaveTeamModal';

const MembershipsListItem = (props) => {
  // Get the data for this component from props
  const { team } = props;
  // Get the details of the user
  const profile = useSelector((state) => state.profile);
  // Find their membership details for this team
  const membership = useSelector((state) =>
    state.members.find(
      (member) =>
        member.teamid === team.teamid && member.email === profile.email,
    ),
  );

  // Whether to show the leave team modal
  const [showModal, setShowModal] = useState(false);

  // Get the dispatch function
  const dispatch = useDispatch();

  // Load data on load
  useEffect(() => {
    dispatch(loadMembers(team.teamid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For accepting a team membership
  const handleAccept = () => {
    dispatch(updateMember(team.teamid, { ...membership, status: 'accepted' }));
    dispatch(loadTeam(team.teamid));
  };

  return (
    <>
      {showModal && (
        <LeaveTeamModal
          member={membership}
          team={team}
          setVisible={setShowModal}
        />
      )}
      <tr>
        <td>{team.name}</td>
        <td>
          <div className="buttons are-small is-pulled-right">
            {membership?.status === 'invited' && (
              <button className="button is-primary" onClick={handleAccept}>
                <span className="icon">
                  <i className="fas fa-check"></i>
                </span>
                <span>Accept Membership</span>
              </button>
            )}
            <button
              className="button is-danger"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <span className="icon">
                <i className="fas fa-times"></i>
              </span>
              <span>Leave Team</span>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default MembershipsListItem;
