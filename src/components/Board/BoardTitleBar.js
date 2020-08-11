import React from 'react';
import { Link } from 'react-router-dom';

const BoardTitleBar = (props) => {
  return (
    <div className="columns is-vcentered">
      <div className="column">
        <h1 className="title is-4">{props.board.name}</h1>
      </div>
      <div className="column is-narrow">
        <div className="buttons">
          <button className="button">
            {props.votesRemaining} Vote(s) Left
          </button>
          {props.board.userId === props.profile.id && (
            <button
              className="button"
              onClick={() => props.setCreateColumnModalVisible(true)}
            >
              <i className="fas fa-plus mr-3"></i> Add Column
            </button>
          )}
          <Link to={props.dashboardPath}>
            <button className="button">
              <i className="fas fa-home mr-3"></i> Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardTitleBar;
