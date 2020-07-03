import React from 'react';
import moment from "moment";

const BoardCard = (props) => {

  const toggleModal = () => {
    const target = document.getElementById(`deleteBoardModal-${props.board.boardId}`);
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    target.classList.toggle('is-active');
  }

  return (<div className="card">
    <div className="card-content">

      <h5 className="title is-5 mb-0">{props.board.name}</h5>
      <p className="is-size-7">Created {moment(props.board.created).format('DD/MM/YYYY HH:mm')}</p>
      <p className="my-2">{props.board.description}</p>

      <div className="buttons">
        <button className="button is-primary">View</button>
        <button className="button is-danger" onClick={toggleModal}>Delete
        </button>
      </div>

    </div>
  </div>);

}

export default BoardCard;
