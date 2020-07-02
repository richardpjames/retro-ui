import React from 'react';
import moment from 'moment';

const BoardListDetails = (props) => {

  const handleDelete = () => {
    props.removeBoard(props.board.boardId);
  }

  return (
    <div>
      <div className="modal fade" id={`modal-${props.board.boardId}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete {props.board.name}?</h5>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this board? There is no way to undo this later.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card my-3 p-2 shadow-sm">
        <div className="card-body">

          <h5>{props.board.name}</h5>
          <p className="small">Created {moment(props.board.created).format('DD/MM/YYYY HH:mm')}</p>
          <p>{props.board.description}</p>

          <button className="btn btn-primary align-middle">View</button>
          <button className="btn btn-danger ml-3" data-toggle="modal" data-target={`#modal-${props.board.boardId}`}>Delete</button>

        </div>
      </div>
    </div>
  );
};

export default BoardListDetails;
