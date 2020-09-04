import React from 'react';
import { useDispatch } from 'react-redux';
import actionTypes from '../../../redux/actions/actionTypes';
import { removeMember } from '../../../redux/actions/memberActions';

const LeaveTeamModal = (props) => {
  // Get the member from the props
  const { member, team } = props;
  // Get the dispatch function
  const dispatch = useDispatch();

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    // Remove the membership from the DB
    dispatch(removeMember(team.teamid, member.memberid));
    // Just remove the team from redux
    dispatch({ type: actionTypes.REMOVE_TEAM, teamid: team.teamid });
    props.setVisible(false);
  };

  return (
    <>
      <div className="modal is-active" id="deleteTeamModal">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h5 className="title is-5">Leave Team</h5>
            <p className="my-3">
              Are you sure that you want to leave this team?
            </p>
            <form onSubmit={handleSubmit}>
              <div className="buttons mt-5">
                <button type="submit" className="button is-danger">
                  <i className="fas fa-times mr-3"></i> Leave
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    props.setVisible(false);
                  }}
                >
                  <i className="fas fa-ban mr-3"></i> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveTeamModal;
