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
      <div className="container">
        <div className="columns mx-5 my-5">
          <div className="column">
            <Login setIsAuthenticated={props.setIsAuthenticated} />
          </div>
          <div className="column">
            <Register setIsAuthenticated={props.setIsAuthenticated} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
