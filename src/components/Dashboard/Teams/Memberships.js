import React from 'react';
import { useSelector } from 'react-redux';
import MembershipsListItem from './MembershipsListItem';
import LoadingSpinner from '../../Common/LoadingSpinner';

const Memberships = (props) => {
  // Get the profile for the user and the teams
  const profile = useSelector((state) => state.profile);
  // Filter out to find teams only owned by this user
  const teams = useSelector((state) =>
    state.teams.filter((team) => team.userid !== profile.userid),
  );

  return (
    <>
      {/* This is only displayed if there are any teams */}
      {teams.length > 0 && (
        <div className="box px-5 py-5">
          {/* This is the top of the box, showing the title and button */}
          <div className="columns">
            <div className="column">
              <h3 className="title is-3">Memberships</h3>
              <h6 className="subtitle is-6 ml-1">
                As well as the teams you have created, you are also a member of
                the following teams which have been created by other users.
              </h6>
            </div>
          </div>
          {/* This next div contains the list of teams */}
          <div>
            <LoadingSpinner />
            <table className="table is-fullwidth is-striped">
              <tbody>
                {teams.map((team, index) => (
                  <MembershipsListItem
                    key={team.teamid}
                    team={team}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Memberships;
