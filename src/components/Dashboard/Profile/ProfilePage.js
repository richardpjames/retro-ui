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
              <td className="is-50-td">Nickname</td>
              <td className="is-capitalized">{props.profile.nickname}</td>
            </tr>
            <tr>
              <td className="is-50-td">Email</td>
              <td className="is-50-td">{props.profile.email}</td>
            </tr>
            <tr>
              <td className="is-50-td">Member Since</td>
              <td className="is-50-td">
                {moment(props.profile.created_at).format('DD/MM/YYYY')}
              </td>
            </tr>
            <tr>
              <td className="is-50-td">Times Logged In</td>
              <td className="is-50-td">{props.profile.logins_count}</td>
            </tr>
            <tr>
              <td className="is-50-td">Current Subscription Plan</td>
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
                      <td className="is-50-td">Current Status</td>
                      <td className="is-capitalized">
                        {props.profile.subscription.state}
                      </td>
                    </tr>
                    <tr>
                      <td className="is-50-td">Next Payment Amount</td>
                      <td className="is-50-td">
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
                      <td className="is-50-td">Next Payment Date</td>
                      <td className="is-50-td">
                        {props.profile.subscription.next_payment &&
                        props.profile.subscription.next_payment.date
                          ? moment(
                              props.profile.subscription.next_payment.date,
                            ).format('DD/MM/YYYY')
                          : ``}
                      </td>
                    </tr>
                    <tr>
                      <td className="is-50-td">Payment Method</td>
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
              </>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default ProfilePage;
