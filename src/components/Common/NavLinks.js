import React from 'react';
import {Link} from "react-router-dom";
import ProtectedNavLinks from "./ProtectedNavLinks";

const NavLinks = (props) => {

  return (
    <div className="navbar-start">
      <Link className="navbar-item" to="/" onClick={props.closeNavLinks}><i className="fas fa-home mr-3"></i> Home</Link>
      <ProtectedNavLinks closeNavLinks={props.closeNavLinks}/>
      <Link className="navbar-item" to="/about" onClick={props.closeNavLinks}><i className="fas fa-question mr-3"></i> About</Link>
    </div>
  );

}

export default NavLinks;
