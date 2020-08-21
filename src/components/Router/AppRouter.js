import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import { useCookies } from 'react-cookie';
import GhostContentAPI from '@tryghost/content-api';
import Nav from '../Common/Nav';
import Dashboard from '../Dashboard/Dashboard';
import BoardPage from '../Board/BoardPage';
import Purchase from '../Pages/Purchase';
import Footer from '../Common/Footer';
import Page from '../Common/Page';
import Blog from '../Blog/Blog';
import ErrorPage from '../Pages/ErrorPage';
import CookieBanner from '../Common/CookieBanner';
import LoginPage from '../Auth/LoginPage';
import Forgotten from '../Auth/Forgotten';
import Reset from '../Auth/Reset';

const AppRouter = () => {
  // Only display the page if Auth0 has completed loading as this is required
  // to determine some UI elements to draw.
  const [dashboardPath, setDashboardPath] = useState(
    localStorage.getItem('dashboard_path') || '/dashboard',
  );
  // Authentication cookie
  // For displaying authentication links
  const [authCookie] = useCookies(['isAuthenticated']);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authCookie.isAuthenticated === 'true',
  );

  // This is for fetching page and blog information
  const api = new GhostContentAPI({
    url: 'https://cms.retrospectacle.io',
    key: '86d9d3de024cf62a8d88e795aa',
    version: 'v3',
  });

  // Helpers for authentication

  return (
    <Router>
      <div className="above-footer">
        <Nav
          dashboardPath={dashboardPath}
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
          />{' '}
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard
                {...props}
                dashboardPath={dashboardPath}
                setDashboardPath={setDashboardPath}
              />
            )}
          />
          <Route
            path="/board/:boardId"
            render={(props) => (
              <BoardPage {...props} dashboardPath={dashboardPath} />
            )}
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
            path="/auth/login"
            render={(props) => (
              <LoginPage {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          />
          <Route
            path="/auth/forgotten"
            render={(props) => <Forgotten {...props} />}
          />
          <Route
            path="/auth/reset/:resetToken/:userId"
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
  );
};

export default AppRouter;
