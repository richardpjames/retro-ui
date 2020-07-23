import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside class="menu mx-5 my-5">
      <p class="menu-label">Boards</p>
      <ul class="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard" exact>
            Retrospective Boards
          </NavLink>
        </li>
      </ul>
      <p class="menu-label">Teams</p>
      <ul class="menu-list">
        <li>
          <NavLink activeClassName="is-active" to="/dashboard/teams">
            Teams
          </NavLink>
        </li>
      </ul>
      <p class="menu-label">Settings</p>
      <ul class="menu-list">
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
