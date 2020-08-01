import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

const ProfilePage = (props) => {
  return (
    <div className="content mx-5 my-5">
      <div className="columns">
        <div className="column is-narrow">
          <p className="image is-128x128">
            <img
              src={props.profile.picture}
              alt={props.profile.nickname}
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
        <h2 className="title is-2">Personal Details</h2>
        <table className="table">
          <tbody>
            <tr>
              <td>Nickname</td>
              <td className="is-capitalized">{props.profile.nickname}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{props.profile.email}</td>
            </tr>
            <tr>
              <td>Member Since</td>
              <td>{moment(props.profile.created_at).format('DD/MM/YYYY')}</td>
            </tr>
            <tr>
              <td>Times Logged In</td>
              <td>{props.profile.logins_count}</td>
            </tr>
            <tr>
              <td>Current Subscription Plan</td>
              <td className="is-capitalized">{props.profile.plan}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="title is-2">Your Subscription Details</h2>
        {(() => {
          if (!props.profile.subscription) {
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
                        {props.profile.subscription.state}
                      </td>
                    </tr>
                    <tr>
                      <td>Next Payment Amount</td>
                      <td>
                        {props.profile.subscription.next_payment &&
                        props.profile.subscription.next_payment.amount
                          ? props.profile.subscription.next_payment.amount
                          : ``}
                        {props.profile.subscription.next_payment &&
                        props.profile.subscription.next_payment.currency
                          ? props.profile.subscription.next_payment.currency
                          : ``}
                      </td>
                    </tr>
                    <tr>
                      <td>Next Payment Date</td>
                      <td>
                        {props.profile.subscription.next_payment &&
                        props.profile.subscription.next_payment.date
                          ? moment(
                              props.profile.subscription.next_payment.date,
                            ).format('DD/MM/YYYY')
                          : ``}
                      </td>
                    </tr>
                    <tr>
                      <td>Payment Method</td>
                      <td className="is-capitalized">
                        {
                          props.profile.subscription.payment_information
                            .payment_method
                        }
                        {props.profile.subscription.payment_information
                          .last_four_digits
                          ? ` ending in ${props.profile.subscription.payment_information.last_four_digits}`
                          : ``}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {(() => {
                  if (props.profile.subscription.state !== 'deleted') {
                    return (
                      <>
                        <div className="buttons">
                          <button
                            onClick={() => {
                              props.paddle.Checkout.open({
                                override: props.profile.subscription.update_url,
                                passthrough: props.profile.id,
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
                              props.paddle.Checkout.open({
                                override: props.profile.subscription.cancel_url,
                                passthrough: props.profile.id,
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
