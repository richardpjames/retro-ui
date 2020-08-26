/* eslint jsx-a11y/anchor-is-valid:0 */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../Auth/useAuth';

const Nav = (props) => {
  // Used to determine whether the user is logged in (and so which links to show)
  const { logout } = useAuth();
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
          <img src="/logo.png" width="200" height="28" alt="Site Logo" />
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
                      Features */}

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/features"
              onClick={closeNavLinks}
            >
              <i className="fas fa-mouse mr-3"></i> Features
            </NavLink>
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

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/blog"
              onClick={closeNavLinks}
            >
              <i className="fas fa-rss-square mr-3"></i> Blog
            </NavLink>
          </div>
        </div>
        {/* 
        This final section is for the log in and log out buttons
        */}
        <div className="navbar-end">
          {(() => {
            if (props.isAuthenticated) {
              return (
                <>
                  <NavLink
                    to=""
                    className="navbar-item"
                    onClick={() => {
                      closeNavLinks();
                      logout(props.setIsAuthenticated);
                    }}
                  >
                    <i className="fas fa-sign-out-alt mr-3"></i> Log Out
                  </NavLink>
                </>
              );
            }
            return (
              <>
                <NavLink
                  to="/auth/login"
                  className="navbar-item"
                  onClick={closeNavLinks}
                >
                  <i className="fas fa-sign-in-alt mr-3"></i> Log In
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="navbar-item"
                  onClick={closeNavLinks}
                >
                  <i className="fas fa-user-plus mr-3"></i> Register
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
