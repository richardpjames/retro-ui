import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <aside className="menu mx-5 my-5">
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
      <p className="menu-label">Team Boards</p>
      <ul className="menu-list">
        {props.teams.map((team) => {
          const link = `/dashboard/boards/${team.teamid}`;
          let membership;
          if (team.members) {
            membership = team.members.find(
              (member) =>
                member.email === props.profile.email &&
                member.status === 'accepted',
            );
          }
          if (team.userid === props.profile.userid || membership) {
            return (
              <li key={team.teamid}>
                <NavLink activeClassName="is-active" to={link} exact>
                  <i className="fas fa-chalkboard-teacher mr-3"></i>
                  {team.name}
                </NavLink>
              </li>
            );
          }
          return null;
        })}
      </ul>

      <p className="menu-label">Actions</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/actions" exact>
            <i className="fas fa-exclamation mr-3"></i>All Actions
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

export default Sidebar;
