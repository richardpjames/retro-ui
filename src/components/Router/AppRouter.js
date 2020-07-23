import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Nav from '../Common/Nav';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Dashboard from '../Dashboard/Dashboard';
import BoardPage from '../Board/BoardPage';
import Purchase from '../Pages/Purchase';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from '../Common/LoadingSpinner';

const AppRouter = () => {
  // Only display the page if Auth0 has completed loading as this is required
  // to determine some UI elements to draw.
  const { isLoading } = useAuth0();

  // If loading then show the loading spinner
  if (isLoading) {
    return <LoadingSpinner />;
  }
  // If no longer loading then display the page
  if (!isLoading) {
    return (
      <Router>
        <Nav />
        <ToastContainer
          autoClose={5000}
          newestOnTop
          hideProgressBar
          transition={Slide}
        />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/purchase" component={Purchase} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/board/:boardId" component={BoardPage} />
        </Switch>
      </Router>
    );
  }
};

export default AppRouter;
