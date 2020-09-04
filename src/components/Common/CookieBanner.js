import React, { useState } from 'react';
import Icon from './Icon';

const CookieBanner = (props) => {
  const [preference, setPreference] = useState(
    localStorage.getItem('cookiePreference'),
  );

  const handleClick = (preference) => {
    localStorage.setItem('cookiePreference', preference);
    window.location.reload(false);
    setPreference(preference);
  };

  return (
    <>
      {preference === null && (
        <>
          <div className="notification mb-0">
            <div className="columns is-vcentered">
              <div className="column">
                <p>
                  This site uses cookies in order to monitor usage and optimise
                  the experience for our users. If you are happy for us to store
                  cookies for this purpose then please click accept, otherwise
                  please click decline.
                </p>
                <p>
                  <strong>Please note:</strong> In either case the site will
                  store cookies which are essential to functionality of the
                  site.
                </p>
              </div>
              <div className="column is-narrow">
                <div className="buttons">
                  <button
                    className="button is-success"
                    onClick={() => {
                      handleClick(true);
                    }}
                  >
                    <Icon className="fas fa-check" padding />
                    Accept
                  </button>
                  <button
                    className="button is-danger"
                    onClick={() => {
                      handleClick(false);
                    }}
                  >
                    <Icon className="fas fa-times" padding />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CookieBanner;
