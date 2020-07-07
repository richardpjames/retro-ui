import React from 'react';
import ReactDOM from 'react-dom';
import {Auth0Provider} from "@auth0/auth0-react";
import * as serviceWorker from './serviceWorker';
import AppRouter from "./components/Router/AppRouter";
import 'bulma/css/bulma.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/app.css';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="login.retrospectacle.io"
      clientId="GZsJrMA1MuvKDi9lWx0XxmhdrSAh9YwW"
      redirectUri={window.location.origin}
      audience="https://api.retrospectacle.io"
      scope="read:current_user update:current_user_metadata"
    >
      <AppRouter/>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
