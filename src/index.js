import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import AppRouter from './components/Router/AppRouter';
import 'react-toastify/dist/ReactToastify.css';
import 'cool-checkboxes-for-bulma.io/dist/css/bulma-radio-checkbox.min.css';
import 'bulma-calendar/dist/js/bulma-calendar.min.js';
import './sass/app.sass';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URI}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="read:current_user update:current_user_metadata"
    >
      <AppRouter />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
