import React from 'react';

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
          <p>From here you can view the details that we hold about you.</p>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
