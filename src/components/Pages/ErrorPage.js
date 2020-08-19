import React from 'react';

const ErrorPage = (props) => {
  const error = props.error || props.match.params.error;
  document.title = 'RetroSpectacle - Error Page';
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', 'An error has occurred');

  return (
    <>
      <div className="hero hero-gradient is-medium is-bold is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-hidden-tablet">
                <img src="/retroboard.png" alt="Retrospective Board" />
              </div>
              <div className="column">
                <h1 className="title is-1">Something Has Gone Wrong!</h1>
                <h2 className="subtitle">{error}</h2>
                {error.includes('401') && (
                  <div>
                    <p className="mb-3">
                      This error usually occurs when you try to access something
                      which you do have permissions for.
                    </p>
                    <p>
                      If you are seeing this message after following a link to a
                      board, you should get in touch with the person who sent
                      you the link and check that they have given you the
                      correct permissions.
                    </p>
                  </div>
                )}
                {error.includes('404') && (
                  <div>
                    <p className="mb-3">
                      This error usually occurs when you try to access a page
                      which does not exist.
                    </p>
                    <p>
                      If you are seeing this message after following a link,
                      please check that the link is correct, or look for the
                      correct page on your dashboard or in the blog.
                    </p>
                  </div>
                )}
                {error.includes('500') && (
                  <div>
                    <p className="mb-3">
                      This error usually occurs when something has gone wrong on
                      the RetroSpectacle server.
                    </p>
                    <p>
                      This can also be caused by trying to access a link for a
                      board that does not exist. If you are seeing this message
                      after following a link, please check that the link is
                      correct, or look for the correct page on your dashboard or
                      in the blog.
                    </p>
                  </div>
                )}
                {error.includes('Network Error') && (
                  <div>
                    <p className="mb-3">
                      This error usually occurs when something has gone wrong on
                      the RetroSpectacle server or there is an issue with your
                      internet connection.
                    </p>
                    <p>Please try again in a few minutes.</p>
                  </div>
                )}
              </div>
              <div className="column is-hidden-mobile">
                <img src="/retroboard.png" alt="Retrospective Board" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
