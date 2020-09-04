/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadTeam } from '../../../redux/actions/teamActions';
import { loadMembers } from '../../../redux/actions/memberActions';
import DeleteTeamModal from './DeleteTeamModal';
import MemberListItem from './MemberListItem';
import AddTeamMemberForm from './AddTeamMemberForm';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../Common/LoadingSpinner';
import RenameTeamModal from './RenameTeamModal';

const TeamDetail = (props) => {
  // Get the team id from the props
  const teamid = parseInt(props.match.params.teamid);
  // Control the modal for deleting a team
  const [showModal, setShowModal] = useState(false);
  const [showRename, setShowRename] = useState(false);

  // Get the dispatcher
  const dispatch = useDispatch();
  // Get the team requested
  const team = useSelector((state) =>
    state.teams.find((team) => team.teamid === teamid),
  );
  // Get the team members
  const members = useSelector((state) =>
    state.members.filter((member) => member.teamid === teamid),
  );
  // Get a list of all teams (to prevent delete on last team)
  const profile = useSelector((state) => state.profile);
  // Teams are filtered on the user
  const teams = useSelector((state) =>
    state.teams.filter((team) => team.userid === profile.userid),
  );
  // Load the team on page load
  useEffect(() => {
    // Load this team
    dispatch(loadTeam(teamid));
    // Load the members of the team
    dispatch(loadMembers(teamid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showModal && <DeleteTeamModal setVisible={setShowModal} team={team} />}
      {showRename && <RenameTeamModal setVisible={setShowRename} team={team} />}
      <div className="columns is-centered">
        <div className="column is-12 is-10-widescreen">
          <div className="box px-5 py-5">
            <div className="columns">
              <div className="column">
                <h3 className="title is-3 mb-1">{team?.name}</h3>

                <Link to="/dashboard/teams">
                  <span className="icon">
                    <i className="fas fa-share fa-flip-horizontal"></i>
                  </span>
                  <span>Back to All Teams</span>
                </Link>
                <a
                  onClick={() => {
                    setShowRename(true);
                  }}
                >
                  <span className="icon ml-3">
                    <i className="fas fa-pencil-alt"></i>
                  </span>
                  <span>Rename Team</span>
                </a>
              </div>
              <div className="column is-narrow">
                {/* This button shows the modal for deleting a team - but only if the user
                    has more than one already */}
                {teams.length > 1 && (
                  <button
                    className="button is-danger"
                    onClick={() => setShowModal(true)}
                  >
                    <span className="icon">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete Team</span>
                  </button>
                )}
              </div>
            </div>
            <div>
              <h5 className="title is-5 mt-5 mb-2">Add New Member</h5>
              <p className="mb-5">
                Add a new member to the team by providing their email address.
                Adding a new member here will not send them any email.
              </p>
              <AddTeamMemberForm team={team} />
            </div>
            {/* This next div contains the list of members */}
            <div>
              <h5 className="title is-5 mt-5 mb-2">Team Members</h5>
              <p className="mb-5">
                Members of RetroSpectacle with these email addresses will be
                able to see the boards for this team in their dashboard, and
                participate in any private boards for the team.
              </p>
              <LoadingSpinner />
              <table className="table is-fullwidth is-striped">
                <tbody>
                  {members.map((member) => (
                    <MemberListItem
                      team={team}
                      member={member}
                      key={member.memberid}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetail;
