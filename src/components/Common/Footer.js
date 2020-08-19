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
            <p>Pages</p>
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
                <Link to="/blog/tags/faqs">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>
          <div className="column is-one-fifth">
            <p>Contact</p>
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
              <li>
                <a href="mailto:support@retrospectacle.io">Contact Support</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
