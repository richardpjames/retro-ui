import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="menu mx-5 my-5">
      <p className="menu-label">Boards</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard" exact>
            Retrospective Boards
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Teams</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/teams">
            Teams
          </NavLink>
        </li>
      </ul>
      <p className="menu-label">Settings</p>
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/user">
            User Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
