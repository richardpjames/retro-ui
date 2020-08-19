import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  document.title = 'RetroSpectacle - Home';
  document
    .querySelector('meta[name="description"]')
    .setAttribute(
      'content',
      'RetroSpecacle provides amazing tools for running effective and engaging retrospectives online.',
    );

  return (
    <>
      {/* This is the main header */}
      <div className="hero hero-gradient is-medium is-bold is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-hidden-tablet">
                <img src="/retroboard.png" alt="Retrospective Board" />
              </div>
              <div className="column">
                <h1 className="title is-1">
                  Looking for a Better Way to Run Sprint Retrospectives?
                </h1>
                <h2 className="subtitle">
                  RetroSpectacle provides free boards for running fun and
                  insightful sprint retrospectives online
                </h2>
                <Link to="/dashboard">
                  <button className="button is-success">
                    Get Started for Free!
                  </button>
                </Link>
              </div>
              <div className="column is-hidden-mobile">
                <img src="/retroboard.png" alt="Retrospective Board" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Why retrospectives are important */}
      <div className="hero is-medium is-bold ">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-one-third">
                <img src="/coworking.png" alt="Working Together" />
              </div>
              <div className="column">
                <div className="content">
                  <h1 className="title is-1">
                    Why are Sprint Retrospectives Important?
                  </h1>
                  <p className="is-4">
                    Retrospectives are an important part of any agile process.
                    They provide constant oppourtunities to learn and improve,
                    and they are a key tool in engaging the development team.
                  </p>
                  <p>Retrospectives provide an oppourtunity for the team to:</p>
                  <ul>
                    <li>Resolve any conflict areas.</li>
                    <li>
                      Improve the processes continuously by knowing ‘what can be
                      improved’.
                    </li>
                    <li>
                      Share views for improvement with the feel of ownership.
                    </li>
                    <li>
                      Keep projects on the right track by fixing the priorities
                      and directions.
                    </li>
                    <li>
                      Identify risk and problem factors at an early stage.
                    </li>
                    <li>
                      Create transparency and builds trust among the team
                      members that strengthen the team spirit.
                    </li>
                  </ul>
                  <Link to="/blog/posts/getting-started-with-retrospectacle">
                    <button
                      className="button is-success"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      See How to Get Started
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Why use retrospectacle? */}
      <div className="hero is-medium is-bold is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-one-third is-hidden-tablet">
                <img src="/kanban.png" alt="Retrospective Board" />
              </div>
              <div className="column">
                <div className="content">
                  <h1 className="title is-1">How Can RetroSpectacle Help?</h1>
                  <p>
                    RetroSpectacle provides a number of benefits over a
                    traditional retrospective run using sticky notes and a
                    whiteboard
                  </p>
                  <ul>
                    <li>
                      Keep an online record of all of your past retrospectives
                      which are available for the team to view at any time.
                    </li>
                    <li>
                      Track actions arising from retrospectives to ensure that
                      ideas are taken forwards and implemented.
                    </li>
                    <li>
                      Easier collaboration for teams working remotely (or with
                      some team members working from home).
                    </li>
                    <li>
                      Ideas for new retrospective formats are provided through
                      templates, which means keeping sessions new, fun and
                      engaging is made much easier.
                    </li>
                  </ul>
                  <Link to="/pricing">
                    <button
                      className="button is-success"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      See Pricing and Features
                    </button>
                  </Link>
                </div>
              </div>
              <div className="column is-one-third is-hidden-mobile">
                <img src="/kanban.png" alt="Retrospective Board" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
