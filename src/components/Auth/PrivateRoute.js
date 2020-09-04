import React from 'react';
import { Route, useHistory } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  // Get the history object
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        // If the user is authenticated the continue
        if (isAuthenticated === undefined) {
          return <></>;
        } else if (isAuthenticated) {
          return <Component {...props} />;
        }
        // Otherwise, set the return path and move to login
        localStorage.setItem('returnUrl', window.location.pathname);
        history.push('/auth/login');
      }}
    />
  );
};

export default PrivateRoute;
