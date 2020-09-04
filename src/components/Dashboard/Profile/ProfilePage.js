import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UpdatePassword from '../../Auth/UpdatePassword';
import { loadProfile } from '../../../redux/actions/profileActions';
import LoadingSpinner from '../../Common/LoadingSpinner';

const ProfilePage = (props) => {
  // Get the profile and the dispatcher
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Load the profile on load
  useEffect(() => {
    dispatch(loadProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="columns is-centered">
      <div className="column is-12 is-10-widescreen">
        <div className="box px-5 py-5">
          <LoadingSpinner />
          <div className="columns is-vcentered">
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
              <p>From here you can view the details that we hold about you.</p>
              <p>
                You can change your profile picture on{' '}
                <a
                  href="https://gravatar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gravatar!
                </a>
              </p>
            </div>
          </div>
          <div className="content">
            <h2 className="title is-2">Personal Details</h2>
            <table className="table is-striped">
              <tbody>
                <tr>
                  <td className="is-50-td">Nickname</td>
                  <td className="is-capitalized">{profile.nickname}</td>
                </tr>
                <tr>
                  <td className="is-50-td">Email</td>
                  <td className="is-50-td">{profile.email}</td>
                </tr>
              </tbody>
            </table>
            <UpdatePassword profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
