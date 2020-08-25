import React from 'react';
import Login from './Login';
import Register from './Register';

const LoginPage = (props) => {
  document.title = 'RetroSpectacle - Login';
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', 'The RetroSpectacle Login Page');

  return (
    <>
      {props.isAuthenticated === false && (
        <div className="container">
          <div className="my-5">
            <Login setIsAuthenticated={props.setIsAuthenticated} />
          </div>
          <div className="my-5">
            <Register setIsAuthenticated={props.setIsAuthenticated} />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
