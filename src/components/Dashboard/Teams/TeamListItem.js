import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMembers } from '../../../redux/actions/memberActions';
import { loadBoards } from '../../../redux/actions/boardActions';
import { Link } from 'react-router-dom';

const TeamListItem = (props) => {
  // Get the team from the props
  const { team } = props;

  // Get the dispatch function
  const dispatch = useDispatch();

  // Read the memberships from the state
  const members = useSelector((state) =>
    state.members.filter((member) => member.teamid === team.teamid),
  );
  // Read the boards from the state
  const boards = useSelector((state) =>
    state.boards.filter((board) => board.teamid === team.teamid),
  );

  // Load memberships and boards on loading
  useEffect(() => {
    dispatch(loadMembers(team.teamid));
    dispatch(loadBoards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <tr>
        <td>{team.name}</td>
        <td>
          <div className="columns is-vcentered is-hidden-mobile">
            <div className="column is-narrow">
              <div className="tags has-addons">
                <span className="tag is-primary">{members.length + 1}</span>
                <span className="tag is-dark">Members</span>
              </div>
            </div>
            <div className="column is-narrow">
              <div className="tags has-addons">
                <span className="tag is-primary">{boards.length}</span>
                <span className="tag is-dark">Boards</span>
              </div>
            </div>
          </div>
        </td>
        <td className="has-text-right">
          <Link to={`/dashboard/teams/${team.teamid}`}>
            <span className="icon">
              <i className="fas fa-share"></i>
            </span>
            <span>View Team</span>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default TeamListItem;
