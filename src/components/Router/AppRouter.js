import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import GhostContentAPI from '@tryghost/content-api';
import Nav from '../Common/Nav';
import Home from '../Pages/Home';
import Dashboard from '../Dashboard/Dashboard';
import BoardPage from '../Board/BoardPage';
import Purchase from '../Pages/Purchase';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import Footer from '../Common/Footer';
import Page from '../Common/Page';
import Blog from '../Blog/Blog';
import ErrorPage from '../Pages/ErrorPage';
import CookieBanner from '../Common/CookieBanner';

const AppRouter = () => {
  // Only display the page if Auth0 has completed loading as this is required
  // to determine some UI elements to draw.
  const { isLoading } = useAuth0();
  const [dashboardPath, setDashboardPath] = useState(
    localStorage.getItem('dashboard_path') || '/dashboard',
  );

  // This is for fetching page and blog information
  const api = new GhostContentAPI({
    url: 'https://cms.retrospectacle.io',
    key: '86d9d3de024cf62a8d88e795aa',
    version: 'v3',
  });

  // If loading then show the loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }
  // If no longer loading then display the page
  if (!isLoading) {
    return (
      <Router>
        <div className="above-footer">
          <Nav dashboardPath={dashboardPath} />
          <CookieBanner />
          <ToastContainer
            autoClose={5000}
            newestOnTop
            hideProgressBar
            transition={Slide}
          />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/pricing" component={Purchase} />
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
  }
};

export default AppRouter;
