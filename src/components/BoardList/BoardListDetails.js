import React from 'react';

const BoardListDetails = (props) => {
  return (
    <div className="card my-3 p-2 shadow-sm">
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <h5>{props.board.name}</h5>
            <p>{props.board.description}</p>
          </div>
          <div className="col-4 align-middle text-right">
            <button className="btn btn-primary align-middle">View</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardListDetails;
