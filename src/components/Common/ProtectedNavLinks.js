import React from 'react';
import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const ProtectedNavLinks = (props) => {

  const {isAuthenticated} = useAuth0();

  if (isAuthenticated) {
    return (<div>
      <li className="nav-item">
        <Link className="nav-link" to="/boards"><i className="fas fa-chalkboard-teacher"></i> Boards</Link>
      </li>
    </div>);
  }
  return null;
}

export default ProtectedNavLinks;
