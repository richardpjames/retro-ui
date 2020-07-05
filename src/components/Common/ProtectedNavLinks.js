import React from 'react';
import {NavLink} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const ProtectedNavLinks = (props) => {

  const {isAuthenticated} = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="navbar-start">
        <NavLink className="navbar-item" activeClassName="is-active" to="/dashboard" onClick={props.closeNavLinks}><i
          className="fas fa-chalkboard-teacher mr-3"></i> Boards</NavLink>
      </div>);
  }
  return null;
}

export default ProtectedNavLinks;
