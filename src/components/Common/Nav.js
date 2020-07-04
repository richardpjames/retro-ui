/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, {useState} from 'react';
import NavLinks from "./NavLinks";
import AuthNavLinks from "./AuthNavLinks";

const Nav = () => {

  const [navLinksOpen, updateNavLinksOpen] = useState(false);

  const getNavbarToggleClass = () => {
    if (navLinksOpen) {
      return "navbar-burger burger is-active"
    } else {
      return "navbar-burger burger"
    }
  }

  const getNavbarLinksClass = () => {
    if (navLinksOpen) {
      return "navbar-menu is-active is-radiusless";
    } else {
      return "navbar-menu is-radiusless";
    }
  }

  const closeNavLinks = () => {
    updateNavLinksOpen(false);
  }

  return (
    <nav className="navbar is-radiusless" role="navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="/logo.svg" width="175" height="28" alt="Site Logo"/>
        </a>
        <a role="button" id="navbarToggle" className={getNavbarToggleClass()} aria-label="menu" aria-expanded="false"
           onClick={() => updateNavLinksOpen(!navLinksOpen)}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarLinks" className={getNavbarLinksClass()}>
        <div className="navbar-start">
          <NavLinks closeNavLinks={closeNavLinks}/>
        </div>
        <div className="navbar-end">
          <AuthNavLinks closeNavLinks={closeNavLinks}/>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
