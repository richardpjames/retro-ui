import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import usersService from '../../../services/usersService';
import moment from 'moment';

const ProfilePage = () => {
  // State for holding the user information
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const Paddle = window.Paddle;

  // Get the access token for the user
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get the access token required to call the API
        const token = await getAccessTokenSilently();
        // Call the API
        const profile = await usersService.getById(user.sub, token);
        // Update the boards
        if (profile) {
          setProfile(profile);
        }
        // Stop loading bar
        setLoading(false);
      } catch (error) {
        // For now just log any errors - TODO: Improve error handling
        toast.error(error);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, user]);

  return (
    <div className="content mx-5 my-5">
      <div className="columns">
        <div className="column is-narrow">
          <p className="image is-128x128">
            <img
              src={profile.picture}
              alt={profile.nickname}
              className="is-rounded"
            />
          </p>
        </div>
        <div className="column">
          <h1 className="title is-1 mt-3">Your Profile</h1>
          <p>
            From here you can view the details that we hold about you and update
            your subscripiton.
          </p>
        </div>
      </div>
      <div className="content">
        {(() => {
          if (loading)
            return (
              <progress
                className="progress is-small is-primary my-5"
                max="100"
              ></progress>
            );
        })()}

        <h2 className="title is-2">Personal Details</h2>
        <table className="table">
          <tbody>
            <tr>
              <td>Nickname</td>
              <td className="is-capitalized">{profile.nickname}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <td>Member Since</td>
              <td>{moment(profile.created_at).format('DD/MM/YYYY')}</td>
            </tr>
            <tr>
              <td>Times Logged In</td>
              <td>{profile.logins_count}</td>
            </tr>
            <tr>
              <td>Current Subscription Plan</td>
              <td className="is-capitalized">{profile.plan}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="title is-2">Your Subscription Details</h2>
        {(() => {
          if (!profile.subscription) {
            return (
              <>
                <p>No subscription details are held.</p>
                <div className="buttons">
                  <Link to="/pricing">
                    <button className="button is-primary">
                      <i className="fas fa-shopping-cart mr-3"></i>Upgrade Your
                      Account
                    </button>
                  </Link>
                </div>
              </>
            );
          } else {
            return (
              <>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Current Status</td>
                      <td className="is-capitalized">
                        {profile.subscription.state}
                      </td>
                    </tr>
                    <tr>
                      <td>Next Payment Amount</td>
                      <td>
                        {profile.subscription.next_payment &&
                        profile.subscription.next_payment.amount
                          ? profile.subscription.next_payment.amount
                          : ``}
                        {profile.subscription.next_payment &&
                        profile.subscription.next_payment.currency
                          ? profile.subscription.next_payment.currency
                          : ``}
                      </td>
                    </tr>
                    <tr>
                      <td>Next Payment Date</td>
                      <td>
                        {profile.subscription.next_payment &&
                        profile.subscription.next_payment.date
                          ? moment(
                              profile.subscription.next_payment.date,
                            ).format('DD/MM/YYYY')
                          : ``}
                      </td>
                    </tr>
                    <tr>
                      <td>Payment Method</td>
                      <td className="is-capitalized">
                        {
                          profile.subscription.payment_information
                            .payment_method
                        }
                        {profile.subscription.payment_information
                          .last_four_digits
                          ? ` ending in ${profile.subscription.payment_information.last_four_digits}`
                          : ``}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {(() => {
                  if (profile.subscription.state !== 'deleted') {
                    return (
                      <>
                        <div className="buttons">
                          <button
                            onClick={() => {
                              Paddle.Checkout.open({
                                override: profile.subscription.update_url,
                                passthrough: user.sub,
                                success: '/dashboard/profile',
                              });
                            }}
                            className="button is-primary"
                          >
                            <i className="fas fa-shopping-cart mr-3"></i>Update
                            Payment Information
                          </button>
                          <button
                            onClick={() => {
                              Paddle.Checkout.open({
                                override: profile.subscription.cancel_url,
                                passthrough: user.sub,
                                success: '/dashboard/profile',
                              });
                            }}
                            className="button is-danger"
                          >
                            <i className="fas fa-ban mr-3"></i>Cancel
                            Subscription
                          </button>
                        </div>
                        <p>
                          Note: if you cancel your subscription now, you will
                          still retain access to your current subscription plan
                          until your next billing date.
                        </p>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="buttons">
                          <Link to="/pricing">
                            <button className="button is-primary">
                              <i className="fas fa-shopping-cart mr-3"></i>Start
                              New Subscription
                            </button>
                          </Link>
                        </div>
                      </>
                    );
                  }
                })()}
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default ProfilePage;
