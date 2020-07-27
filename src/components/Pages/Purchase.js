import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import usersService from '../../services/usersService';

const Purchase = () => {
  const Paddle = window.Paddle;
  const {
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        // Get the access token required to call the API
        const token = await getAccessTokenSilently();
        // Call the API
        const profile = await usersService.getById(user.sub, token);
        // Update the boards
        if (profile) {
          setProfile(profile);
        }
      }
    };
    fetchData();
  }, [user, isAuthenticated, getAccessTokenSilently]);

  const openCheckout = () => {
    Paddle.Checkout.open({
      product: 601119, // Replace with your Product or Plan ID
      allowQuantity: false,
      disableLogout: true,
      email: user.email,
      passthrough: user.sub,
      success: '/dashboard/profile',
    });
  };

  return (
    <>
      <div className="hero hero-gradient is-medium is-bold is-dark">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-one-third">
                <div className="content">
                  <h1 className="title is-1 mt-3">Pricing Plans</h1>
                  <p>
                    Our free tier has all of the functionality that you need to
                    run a succesful retrospective. However, the professional
                    tier offers an increased number of boards and teams, which
                    you may require as your team grows and retrospectives become
                    more important.
                  </p>
                  <p>
                    A full breakdown of the differences in each tier is
                    available below. Note that our professional plan comes with
                    a 30 day free trial, so you can decide if you want to use
                    the features it provides. It's no hassle to cancel at any
                    time during the trial period (simply cancel your
                    subscription from the profile page on the dashboard).
                  </p>
                </div>
              </div>
              <div className="column">
                <div className="content">
                  <div className="box px-1 py-1">
                    <div className="pricing-table is-comparative">
                      <div className="pricing-plan is-features">
                        <div className="plan-header">Features</div>
                        <div className="plan-price">
                          <span className="plan-price-amount">&nbsp;</span>
                        </div>
                        <div className="plan-items">
                          <div className="plan-item">Built In Templates</div>
                          <div className="plan-item">Boards</div>
                          <div className="plan-item">Teams</div>
                          <div className="plan-item">Team Members</div>
                          <div className="plan-item">Free Trial</div>
                        </div>
                        <div className="plan-footer"></div>
                      </div>
                      <div className="pricing-plan">
                        <div className="plan-header">Starter</div>
                        <div className="plan-price">
                          <span className="plan-price-amount">
                            <span className="plan-price-currency">$</span>Free
                          </span>
                        </div>
                        <div className="plan-items">
                          <div className="plan-item" data-feature="Templates">
                            10
                          </div>
                          <div className="plan-item" data-feature="Boards">
                            5
                          </div>
                          <div className="plan-item" data-feature="Teams">
                            1
                          </div>
                          <div
                            className="plan-item"
                            data-feature="Team Members"
                          >
                            5
                          </div>
                          <div className="plan-item" data-feature="Free Trial">
                            -
                          </div>
                        </div>
                      </div>

                      <div className="pricing-plan is-success">
                        <div className="plan-header">Professional</div>
                        <div className="plan-price">
                          <span className="plan-price-amount">
                            <span className="plan-price-currency">$</span>10
                          </span>
                          /month
                        </div>
                        <div className="plan-items">
                          <div className="plan-item" data-feature="Templates">
                            10
                          </div>
                          <div className="plan-item" data-feature="Boards">
                            Unlimited
                          </div>
                          <div className="plan-item" data-feature="Teams">
                            Unlimited
                          </div>
                          <div
                            className="plan-item"
                            data-feature="Team Members"
                          >
                            Unlimited
                          </div>
                          <div className="plan-item" data-feature="Free Trial">
                            30 Days
                          </div>
                        </div>
                        <div className="plan-footer">
                          {(() => {
                            // If the user already has a professional plan then no need to upgrade
                            if (
                              profile &&
                              profile.plan &&
                              profile.plan === 'professional'
                            ) {
                              return (
                                <button
                                  className="button is-fullwidth"
                                  disabled="disabled"
                                >
                                  Your Current Plan
                                </button>
                              );
                            }
                            // If the user is logged in then we can open the checkout
                            if (isAuthenticated && profile.plan) {
                              return (
                                <button
                                  className="button is-fullwidth"
                                  onClick={openCheckout}
                                >
                                  Upgrade
                                </button>
                              );
                            }
                            // If the user is not logged in then prompt them to sign up
                            if (!isAuthenticated) {
                              return (
                                <>
                                  <button
                                    className="button is-fullwidth"
                                    onClick={loginWithRedirect}
                                  >
                                    Log In or Sign Up
                                  </button>
                                </>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <p>
                    RetroSpectacle provides the following features for both our
                    starter and professional members.
                  </p>
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

export default Purchase;
