/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import DeleteMemberModal from './DeleteMemberModal';

const MemberListItem = (props) => {
  // Control whether we show the delete member modal
  const [showModal, setShowModal] = useState(false);

  // Get the team from the props
  const { member, team } = props;

  return (
    <>
      {/* This modal is for removing a team member */}
      {showModal && (
        <DeleteMemberModal
          team={team}
          member={member}
          setVisible={setShowModal}
        />
      )}
      <tr>
        <td>{member.email}</td>
        <td className="has-text-right">
          <a className="delete" onClick={() => setShowModal(true)}></a>
        </td>
      </tr>
    </>
  );
};

export default MemberListItem;
