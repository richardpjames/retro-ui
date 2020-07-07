import React from 'react';
import {NavLink} from "react-router-dom";

const ProtectedNavLinks = (props) => {

  if (props.isAuthenticated) {
    return (
      <>
        <NavLink className="navbar-item" activeClassName="is-active" to="/dashboard" onClick={props.closeNavLinks}><i
          className="fas fa-chalkboard-teacher mr-3"></i> Boards</NavLink>
      </>);
  }
  return null;
}

export default ProtectedNavLinks;
