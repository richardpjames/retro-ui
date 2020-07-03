import React from 'react';

/*
* This component it the about page in its entirity (i.e. this is just static content)
*/

const About = (props) => {
    return (
      <div className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">About</h1>
            <h2 className="subtitle">Free boards for running fun and insightful sprint retrospectives</h2>
          </div>
        </div>
      </div>
    );
}

export default About;
