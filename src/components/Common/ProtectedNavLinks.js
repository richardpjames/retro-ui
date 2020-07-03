import React from 'react';
import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const ProtectedNavLinks = (props) => {

  const {isAuthenticated} = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="navbar-start">
        <Link className="navbar-item" to="/boards"><i className="fas fa-chalkboard-teacher mr-3"></i> Boards</Link>
      </div>);
  }
  return null;
}

export default ProtectedNavLinks;
