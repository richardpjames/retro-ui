import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>RetroSpectacle.io</strong>
        </p>
        <p>
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
