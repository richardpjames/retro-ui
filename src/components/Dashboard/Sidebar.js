import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="menu mx-5 my-5">
      <p className="menu-label">Boards</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard" exact>
            <i className="fas fa-chalkboard-teacher mr-3"></i>Retrospective
            Boards
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Teams</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/teams">
            <i className="fas fa-user-friends mr-3"></i>Teams
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
    </aside>
  );
};

export default Sidebar;
