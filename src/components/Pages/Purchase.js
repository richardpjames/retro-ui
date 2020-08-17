import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import usersService from '../../services/usersService';
import Icon from '../Common/Icon';

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
                    Note that our professional plan comes with a 30 day free
                    trial, so you can decide if you want to use the features it
                    provides. It's no hassle to cancel at any time during the
                    trial period (simply cancel your subscription from the
                    profile page on the dashboard).
                  </p>
                </div>
              </div>
              <div className="column">
                <div className="content">
                  <div className="pricing-table">
                    <div className="pricing-plan">
                      <div className="plan-header">Starter</div>
                      <div className="plan-price">
                        <span className="plan-price-amount">
                          <span className="plan-price-currency">$</span>Free
                        </span>
                      </div>
                      <div className="plan-items">
                        <div className="plan-item">10 Built in Templates</div>
                        <div className="plan-item">5 Boards</div>
                        <div className="plan-item">1 Team</div>
                        <div className="plan-item">5 Team Members</div>
                        <div className="plan-item">-</div>
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
                        <div className="plan-item">10 Built in Templates</div>
                        <div className="plan-item">Unlimited Boards</div>
                        <div className="plan-item">Unlimited Teams</div>
                        <div className="plan-item">Unlimited Team Members</div>
                        <div className="plan-item">30 Days Free Trial</div>
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
                          <Icon class="fas fa-chalkboard" padding /> Boards
                        </h2>
                        <p>
                          Create boards for your retrospectives which allow team
                          members to add cards and vote on the most important
                          ones.
                        </p>
                      </div>
                    </div>
                    <div className="tile card mx-5 my-5">
                      <div className="card-content">
                        <h2>
                          <Icon class="fas fa-user-friends" padding /> Teams
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
                          <Icon class="fas fa-puzzle-piece" padding /> Templates
                        </h2>
                        <p>
                          With our built in templates you can quickly and easily
                          try out new retrospective ideas with the team. Each
                          template comes with a preconfigured board and
                          instructions to help you get the most from the
                          session.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tile is-ancestor">
                    <div className="tile card mx-5 my-5">
                      <div className="card-content">
                        <h2>
                          <Icon class="fas fa-arrows-alt" padding /> Drag and
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
                          <Icon class="fas fa-pencil-alt" padding /> Track
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
                          <Icon class="far fa-clock" padding /> Real Time
                          Collaboration
                        </h2>
                        <p>
                          Boards update in real time as other team members add
                          and remove cards, actions and votes.
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
