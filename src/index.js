import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import AppRouter from './components/Router/AppRouter';
import 'react-toastify/dist/ReactToastify.css';
import 'cool-checkboxes-for-bulma.io/dist/css/bulma-radio-checkbox.min.css';
import 'bulma-calendar/dist/js/bulma-calendar.min.js';
import './sass/app.sass';

const Index = (props) => {
  const onRedirectCallback = () => {
    const gtag = window.gtag;
    gtag('event', 'conversion', {
      send_to: 'AW-806522976/mwTyCOCH_dsBEOCgyoAD',
    });
  };

  return (
    <React.StrictMode>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URI}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        scope="read:current_user update:current_user_metadata"
        onRedirectCallback={onRedirectCallback}
      >
        <AppRouter />
      </Auth0Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
