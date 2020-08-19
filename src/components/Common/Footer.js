import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  const scrollTop = (event) => {
    if (event.target.getAttribute('href')) {
      window.scroll(0, 0);
    }
  };

  return (
    <footer className="footer" onClick={scrollTop}>
      <div className="content has-text-left">
        <p>
          <strong>RetroSpectacle.io</strong>
        </p>
        <div className="columns">
          <div className="column is-one-fifth">
            <ul>
              <li>
                <Link to="/blog/posts/getting-started-with-retrospectacle">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <a href="mailto:support@retrospectacle.io">Contact Support</a>
              </li>
            </ul>
          </div>
          <div className="column is-one-fifth">
            <ul>
              <li>
                <a
                  href="https://twitter.com/spectacle_retro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
