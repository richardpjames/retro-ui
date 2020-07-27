/* eslint jsx-a11y/anchor-is-valid:0 */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Nav = () => {
  // Used to determine whether the user is logged in (and so which links to show)
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  // This is toggled by pressing the burger menu on a mobile screen size
  const [navLinksOpen, updateNavLinksOpen] = useState(false);

  // Depending on whether the nav links are open then style the navbar burger menu
  const getNavbarToggleClass = () => {
    if (navLinksOpen) {
      return 'navbar-burger burger is-active';
    } else {
      return 'navbar-burger burger';
    }
  };

  // Depending on whether the nav links are open then style the navbar links
  const getNavbarLinksClass = () => {
    if (navLinksOpen) {
      return 'navbar-menu is-active is-radiusless';
    } else {
      return 'navbar-menu is-radiusless';
    }
  };

  const closeNavLinks = () => {
    updateNavLinksOpen(false);
  };

  // This returns the nav bar at the top of the screen
  return (
    <nav className="navbar is-radiusless is-dark" role="navigation">
      {/* 
      This first part of the nav is for the logo and also includes the burger menu 
      */}
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/logo.svg" width="175" height="28" alt="Site Logo" />
        </Link>
        <a
          role="button"
          id="navbarToggle"
          className={getNavbarToggleClass()}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => updateNavLinksOpen(!navLinksOpen)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      {/* 
      This is the main part of the nav which contains the links to pages
        */}
      <div id="navbarLinks" className={getNavbarLinksClass()}>
        <div className="navbar-start">
          <div className="navbar-start">
            {/* 
            Home
            */}
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              exact
              to="/"
              onClick={closeNavLinks}
            >
              <i className="fas fa-home mr-3"></i> Home
            </NavLink>
            {/* 
                      Upgrade to paid account */}

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/pricing"
              onClick={closeNavLinks}
            >
              <i className="fas fa-shopping-cart mr-3"></i> Pricing & Features
            </NavLink>

            {/* 
            This section is only shown if the user is logged in
            */}
            {(() => {
              if (isAuthenticated) {
                return (
                  <>
                    {/* 
                      Boards
                    */}
                    <NavLink
                      className="navbar-item"
                      activeClassName="is-active"
                      to="/dashboard"
                      onClick={closeNavLinks}
                    >
                      <i className="fas fa-chalkboard-teacher mr-3"></i>
                      Dashboard
                    </NavLink>
                    {/* 
                      Upgrade to paid account
                    
                    <NavLink
                      className="navbar-item"
                      activeClassName="is-active"
                      to="/purchase"
                      onClick={closeNavLinks}
                    >
                      <i className="fas fa-shopping-cart mr-3"></i> Upgrade
                    </NavLink>
                    */}
                  </>
                );
              }
            })()}
          </div>
        </div>
        {/* 
        This final section is for the log in and log out buttons
        */}
        <div className="navbar-end">
          {(() => {
            if (isAuthenticated) {
              return (
                <>
                  <NavLink
                    to=""
                    className="navbar-item"
                    onClick={() => logout()}
                  >
                    <i className="fas fa-sign-out-alt mr-3"></i> Log Out
                  </NavLink>
                </>
              );
            }
            return (
              <>
                <NavLink
                  to=""
                  className="navbar-item"
                  onClick={() => loginWithRedirect()}
                >
                  <i className="fas fa-sign-in-alt mr-3"></i> Log In / Sign Up
                </NavLink>
              </>
            );
          })()}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
