import React from 'react';
import moment from "moment";
import {Link} from "react-router-dom";

const BoardCard = (props) => {

  const toggleModal = () => {
    props.updateBoardToDelete(props.board);
    props.updateModalVisible(true);
  }

  const boardLink = `/board/${props.board.boardId}`;

  return (<div className="card">
    <div className="card-content card-white-bg">

      <h5 className="title is-5 mb-0">{props.board.name}</h5>
      <p className="is-size-7">Created {moment(props.board.created).format('DD/MM/YYYY HH:mm')}</p>
      <p className="my-2">{props.board.description}</p>

      <div className="buttons">
        <Link to={boardLink} className="button is-primary"><i className="fas fa-eye mr-3"></i> View</Link>
        <button className="button is-danger" onClick={toggleModal}><i className="fas fa-trash-alt mr-3"></i> Delete
        </button>
      </div>

    </div>
  </div>);

}

export default BoardCard;
