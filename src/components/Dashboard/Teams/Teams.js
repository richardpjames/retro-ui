import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CreateTeamModal from './CreateTeamModal';
import { loadTeams } from '../../../redux/actions/teamActions';
import { getTeamsForUser } from '../../../redux/selectors/teamSelectors';
import TeamListItem from './TeamListItem';
import Memberships from './Memberships';
import LoadingSpinner from '../../Common/LoadingSpinner';

const Teams = (props) => {
  // Get data and functions from props
  const { teams, loadTeams } = props;
  // Determine whether to show the modal for creating a team
  const [showModal, setShowModal] = useState(false);

  // On load we reload all of the teams for the user
  useEffect(() => {
    // Sometimes we need to not reload the data (after a delete)
    const preventReload = localStorage.getItem('preventReload');
    if (preventReload !== null) {
      return localStorage.removeItem('preventReload');
    }
    // If reloading is not forbidden then load the teams again
    loadTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This component shows the button for creating a team, and then hands over the rendering of the list
  return (
    <>
      {showModal && <CreateTeamModal setVisible={setShowModal} />}
      <div className="columns is-centered">
        <div className="column is-12 is-10-widescreen">
          <div className="box px-5 py-5">
            {/* This is the top of the box, showing the title and button */}
            <div className="columns">
              <div className="column">
                <h3 className="title is-3">Teams</h3>
                <h6 className="subtitle is-6 ml-1">
                  These are the teams that you have created. You can add new
                  members to these teams, or delete the teams from the next
                  screen by clicking "View Team". Please note that you must
                  always have at least one team so that you can create new
                  boards.
                </h6>
              </div>
              <div className="column is-narrow">
                {/* This button shows the modal for creating a new board - this also contains the logic for
                    the creation of the data */}
                <button
                  className="button is-primary"
                  onClick={() => setShowModal(true)}
                >
                  <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span>Create Team</span>
                </button>
              </div>
            </div>
            {/* This next div contains the list of teams */}
            <div>
              <LoadingSpinner />
              <table className="table is-fullwidth is-striped">
                <tbody>
                  {teams.map((team) => (
                    <TeamListItem key={team.teamid} team={team} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Memberships />
        </div>
      </div>
    </>
  );
};

// Mapping state to props
const mapStateToProps = (state) => {
  return {
    teams: getTeamsForUser()(state),
  };
};

// Mapping dispatch to props
const mapDispatchToProps = {
  loadTeams,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
