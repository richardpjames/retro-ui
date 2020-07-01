import React from 'react';
import NavLinks from "./NavLinks";
import AuthNavLinks from "./AuthNavLinks";

const Nav = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <span className="navbar-brand">RetroSpectacle</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div>
          <NavLinks/>
        </div>
        <div className="ml-auto">
          <AuthNavLinks/>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
