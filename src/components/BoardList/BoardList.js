import React from 'react';
import BoardListDetails from "./BoardListDetails";

const BoardList = (props) => {
  return props.boards.map((board) => <BoardListDetails key={board.boardId} board={board} removeBoard={props.removeBoard} />);
}

export default BoardList;
