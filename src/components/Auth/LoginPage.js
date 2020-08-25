import React from 'react';
import Login from './Login';
import Register from './Register';
import { Switch, Route, Link } from 'react-router-dom';
import Forgotten from './Forgotten';

const LoginPage = (props) => {
  document.title = 'RetroSpectacle - Login';
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', 'The RetroSpectacle Login and Registration Page');

  return (
    <>
      <div className="hero-gradient mx-0 my-0">
        <div className="container py-5 px-5">
          <div className="content py-5 px-5">
            <div className="box">
              <div className="tabs is-centered is-boxed">
                <ul>
                  <li
                    className={
                      window.location.pathname === '/auth/login'
                        ? 'is-active'
                        : null
                    }
                  >
                    <Link to="/auth/login">Login</Link>
                  </li>
                  <li
                    className={
                      window.location.pathname === '/auth/register'
                        ? 'is-active'
                        : null
                    }
                  >
                    <Link to="/auth/register">Register</Link>
                  </li>
                </ul>
              </div>
              <Switch>
                <Route
                  path="/auth/login"
                  exact
                  render={(routeProps) => (
                    <>
                      <div className="columns">
                        <div className="column">
                          <Login
                            {...routeProps}
                            setIsAuthenticated={props.setIsAuthenticated}
                          />
                        </div>
                        <div className="column">
                          <Forgotten />
                        </div>
                      </div>
                    </>
                  )}
                />
                <Route
                  path="/auth/register"
                  exact
                  render={(routeProps) => (
                    <Register
                      {...routeProps}
                      setIsAuthenticated={props.setIsAuthenticated}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
