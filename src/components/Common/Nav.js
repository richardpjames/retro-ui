import React from 'react';
import NavLinks from "./NavLinks";
import AuthNavLinks from "./AuthNavLinks";

const Nav = () => {

  const collapse = () => {
    const toggle = document.getElementById("navbarToggle");
    const target = document.getElementById("navbarLinks");
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    toggle.classList.toggle('is-active');
    target.classList.toggle('is-active');
  };

  return (
    <nav className="navbar is-dark" role="navigation">
      <div className="container">
        <div className="navbar-brand">
          <span className="navbar-item">RetroSpectacle</span>
          <a role="button" id="navbarToggle" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
             onClick={collapse}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarLinks" className="navbar-menu">
          <div className="navbar-start">
            <NavLinks/>
          </div>
          <div className="navbar-end">
            <AuthNavLinks/>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
