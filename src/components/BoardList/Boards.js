import React from 'react';
import BoardList from "./BoardList";

const Boards = () => {
  return (<div className="container my-3">
    <h1>Your Boards</h1>
    <p>View an existing board, or create a new one. Your most recent boards are shown
    at the top of the page.</p>
    <BoardList/>
  </div>);
}

export default Boards;
