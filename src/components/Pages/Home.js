import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
                </div>
              </div>
              <div className="column is-one-third is-hidden-mobile">
                <img src="/kanban.png" alt="Retrospective Board" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Features */}
      <div className="hero is-medium is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column">
                <div className="content">
                  <h1 className="title is-1">Features</h1>
                  <p>RetroSpectacle provides a range of features:</p>
                  <div className="tile is-ancestor">
                    <div className="tile card mx-5 my-5">
                      <div className="card-content">
                        <h2>
                          <i className="fas fa-chalkboard mr-3"></i> Boards
                        </h2>
                        <p>
                          Create boards for your retrospectives which allow team
                          members to add cards and comments.
                        </p>
                      </div>
                    </div>
                    <div className="tile card mx-5 my-5">
                      <div className="card-content">
                        <h2>
                          <i className="fas fa-user-friends mr-3"></i> Teams
                        </h2>
                        <p>
                          Create teams and give them access to all of their past
                          and future retrospectives through the online
                          dashboard.
                        </p>
                      </div>
                    </div>
                    <div className="tile card mx-5 my-5">
                      <div className="card-content">
                        <h2>
                          <i className="fab fa-github mr-3"></i> Social Login
                        </h2>
                        <p>
                          Sign up with an email address and password, or use
                          social login providers from Google, GitHub and
                          Microsoft.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tile is-ancestor">
                    <div className="tile card mx-5 my-5">
                      <div className="card-content">
                        <h2>
                          <i className="fas fa-arrows-alt mr-3"></i> Drag and
                          Drop
                        </h2>
                        <p>
                          A simple drag and drop interface makes it easy for all
                          team members to participate.
                        </p>
                      </div>
                    </div>
                    <div className="tile card mx-5 my-5">
                      <div className="card-content">
                        <h2>
                          <i className="fas fa-pencil-alt mr-3"></i> Track
                          Actions
                        </h2>
                        <p>
                          Make a note of actions from each retro and track their
                          progress to ensure that issues are resolved and
                          improvements are implemented
                        </p>
                      </div>
                    </div>
                    <div className="tile card mx-5 my-5">
                      <div className="card-content">
                        <h2>
                          <i className="far fa-clock mr-3"></i> Real Time
                          Collaboration
                        </h2>
                        <p>
                          Boards update in real time as other team members add
                          and remove cards, comments and votes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
