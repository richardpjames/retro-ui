import React from 'react';
import { useDispatch } from 'react-redux';
import { removeMember } from '../../../redux/actions/memberActions';

const DeleteMemberModal = (props) => {
  // Get the member from the props
  const { member, team } = props;
  // Get the dispatch function
  const dispatch = useDispatch();

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(removeMember(team.teamid, member.memberid));
    props.setVisible(false);
  };

  return (
    <>
      <div className="modal is-active" id="deleteTeamModal">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h5 className="title is-5">Remove Team Member</h5>
            <p className="my-3">
              Are you sure that you want to remove this member from the team?
            </p>
            <form onSubmit={handleSubmit}>
              <div className="buttons mt-5">
                <button type="submit" className="button is-danger">
                  <i className="fas fa-trash-alt mr-3"></i> Remove
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

export default DeleteMemberModal;
