import React from 'react';
import {NavLink} from "react-router-dom";
import ProtectedNavLinks from "./ProtectedNavLinks";

const NavLinks = (props) => {

  return (
    <div className="navbar-start">
      <NavLink className="navbar-item" activeClassName="is-active" exact to="/" onClick={props.closeNavLinks}><i
        className="fas fa-home mr-3"></i> Home</NavLink>
      <ProtectedNavLinks closeNavLinks={props.closeNavLinks}/>
      <NavLink className="navbar-item" activeClassName="is-active" to="/about" onClick={props.closeNavLinks}><i
        className="fas fa-question mr-3"></i> About</NavLink>
    </div>
  );

}

export default NavLinks;
