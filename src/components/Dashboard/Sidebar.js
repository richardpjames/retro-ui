import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSortedTeams } from '../../redux/selectors/teamSelectors';
import { getInvitedMemberships } from '../../redux/selectors/memberSelectors';

const Sidebar = (props) => {
  return (
    <aside className="menu mt-2">
      <p className="menu-label">Boards</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard" exact>
            <i className="fas fa-chalkboard-teacher mr-3"></i>Your Boards
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/boards/all" exact>
            <i className="fas fa-chalkboard-teacher mr-3"></i>All Boards
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Your Teams</p>
      <ul className="menu-list">
        {props.teams.map((team) => {
          const link = `/dashboard/boards/${team.teamid}`;
          return (
            <li key={team.teamid}>
              <NavLink activeClassName="is-active" to={link} exact>
                <i className="fas fa-chalkboard-teacher mr-3"></i>
                {team.name}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <p className="menu-label">Actions</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/actions" exact>
            <i className="fas fa-exclamation mr-3"></i>Action Center
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Manage Teams</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/teams">
            <i className="fas fa-user-friends mr-3"></i>Your Teams{' '}
            {props.pendingTeams > 0 ? (
              <span className="tag is-danger is-rounded">
                {props.pendingTeams}
              </span>
            ) : null}
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Settings</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/profile">
            <i className="fas fa-id-badge mr-3"></i>User Profile
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Donate</p>
      <ul className="menu-list">
        <li>
          <a
            className="bmc-button"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.buymeacoffee.com/richardpjames"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buy me a coffee"
            />
            <span style={{ marginLeft: '5px', fontSize: '24px' }}>
              Buy me a coffee
            </span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

// Only props to map in this component (no dispatch)
const mapStateToProps = (state) => {
  return {
    teams: getSortedTeams()(state),
    profile: state.profile,
    pendingTeams: getInvitedMemberships()(state).length,
    test: getInvitedMemberships()(state),
  };
};
// Connect to the component
export default connect(mapStateToProps)(Sidebar);
