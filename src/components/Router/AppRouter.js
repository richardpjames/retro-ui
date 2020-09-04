import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import GhostContentAPI from '@tryghost/content-api';
import Nav from '../Common/Nav';
import Dashboard from '../Dashboard/Dashboard';
import BoardPage from '../Board/BoardPage';
import Footer from '../Common/Footer';
import Page from '../Common/Page';
import Blog from '../Blog/Blog';
import ErrorPage from '../Pages/ErrorPage';
import CookieBanner from '../Common/CookieBanner';
import LoginPage from '../Auth/LoginPage';
import Reset from '../Auth/Reset';
import PrivateRoute from '../Auth/PrivateRoute';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  // This is for fetching page and blog information
  const api = new GhostContentAPI({
    url: 'https://cms.retrospectacle.io',
    key: '86d9d3de024cf62a8d88e795aa',
    version: 'v3',
  });

  // Set authentication
  useEffect(() => {
    const checkAuth = async () => {
      // Make a call to get the logged in status of the user
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/check`,
        { credentials: 'include' },
      );
      // Set is authenticated based on response
      if (response.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <Router>
        <div className="above-footer">
          <Nav
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <CookieBanner />
          <ToastContainer
            autoClose={5000}
            newestOnTop
            hideProgressBar
            transition={Slide}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Page {...props} slug="homepage" api={api} noContainer />
              )}
            />
            <Route
              path="/features"
              render={(props) => (
                <Page {...props} slug="features" api={api} noContainer />
              )}
            />
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
              isAuthenticated={isAuthenticated}
            />
            <PrivateRoute
              path="/board/:boardid"
              component={BoardPage}
              isAuthenticated={isAuthenticated}
            />
            <Route
              path={[
                '/blog/tags/:tagSlug/page/:pageNumber',
                '/blog/tags/:tagSlug',
                '/blog/posts/:postSlug',
                '/blog/page/:pageNumber',
                '/blog',
              ]}
              render={(props) => <Blog {...props} api={api} />}
            />
            <Route
              path="/privacy"
              render={(props) => (
                <Page {...props} slug="privacy-policy" api={api} />
              )}
            />
            <Route
              path="/error/:error"
              render={(props) => <ErrorPage {...props} />}
            />
            <Route
              path={['/auth/login', '/auth/register']}
              render={(props) => (
                <LoginPage
                  {...props}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              path="/auth/reset/:resetToken/:userid"
              render={(props) => <Reset {...props} />}
            />
            <Route
              render={(props) => (
                <ErrorPage
                  {...props}
                  error="Error: Request failed with status code 404"
                />
              )}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default AppRouter;
