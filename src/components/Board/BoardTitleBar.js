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
          <Link to={props.dashboardPath}>
            <button
              className="button has-tooltip-primary"
              data-tooltip="Back to Dashboard"
            >
              <i className="fas fa-home"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardTitleBar;
