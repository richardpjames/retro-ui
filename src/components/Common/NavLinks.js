import React from 'react';
import {Link} from "react-router-dom";
import ProtectedNavLinks from "./ProtectedNavLinks";

const NavLinks = () => {

  return (
    <div className="navbar-start">
      <Link className="navbar-item" to="/"><i className="fas fa-home mr-3"></i> Home</Link>
      <ProtectedNavLinks/>
      <Link className="navbar-item" to="/about"><i className="fas fa-question mr-3"></i> About</Link>
    </div>
  );

}

export default NavLinks;
