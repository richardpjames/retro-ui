/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getUpdatesForAction } from '../../../redux/selectors/updateSelectors';
import {
  loadUpdates,
  removeUpdate,
} from '../../../redux/actions/updateActions';
import AddUpdateForm from './AddUpdateForm';
import LoadingSpinner from '../../Common/LoadingSpinner';

const ActionModal = (props) => {
  // Get the action from props
  const {
    action,
    updates,
    profile,
    loadUpdates,
    removeUpdate,
    setDragDisabled,
  } = props;

  // Load updates and disable drag on opening the modal
  useEffect(() => {
    setDragDisabled(true);
    loadUpdates(action.actionid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="modal is-active" id="actionModal">
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <h5 className="title is-5">Action Details</h5>
            <table className="table is-fullwidth is-striped">
              <tbody>
                <tr>
                  <td>Description</td>
                  <td>{action.text}</td>
                </tr>
                <tr>
                  <td>Owner</td>
                  <td className="is-capitalized">{action.owner}</td>
                </tr>
                <tr>
                  <td>Board</td>
                  <td className="is-capitalized">{action.boardname}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    {action.status === 'todo' && 'To Do'}
                    {action.status === 'progress' && 'In Progress'}
                    {action.status === 'complete' && 'Done'}
                  </td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{moment(action.created).format('DD/MM/YYYY')}</td>
                </tr>
                <tr>
                  <td>Due</td>
                  <td>{moment(action.due).format('DD/MM/YYYY')}</td>
                </tr>
                <tr>
                  <td>Closed</td>
                  <td className="is-capitalized">
                    {action.closed &&
                      moment(action.closed).format('DD/MM/YYYY')}
                  </td>
                </tr>
              </tbody>
            </table>
            <h6 className="title is-6">Updates</h6>
            <LoadingSpinner />
            {updates.map((update, index) => (
              <p key={update.updateid}>
                {update.userid === profile.userid && (
                  <a
                    onClick={() => {
                      removeUpdate(action.actiondid, update.updateid);
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </a>
                )}
                <span>
                  {update.nickname} - {update.update}
                </span>
              </p>
            ))}
            <div className="mt-5">
              <AddUpdateForm action={action} />
            </div>
            <div className="buttons mt-5">
              <button
                type="button"
                className="button"
                onClick={() => {
                  setDragDisabled(false);
                  props.setVisible(false);
                }}
              >
                <i className="fas fa-ban mr-3"></i> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Map state to props
const mapStateToProps = (state, props) => {
  return {
    updates: getUpdatesForAction(props.action.actionid)(state),
    profile: state.profile,
  };
};

// Map dispatch to props
const mapDispatchToProps = {
  loadUpdates,
  removeUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionModal);
