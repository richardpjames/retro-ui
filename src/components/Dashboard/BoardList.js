import React from 'react';
import DeleteBoardModal from "./DeleteBoardModal";
import BoardCard from "./BoardCard";

const BoardList = (props) => {

  return (
    <div>
      {
        props.boards.map((board) =>
          <div className="my-3">
            <DeleteBoardModal key={board.boardId} board={board} removeBoard={props.removeBoard}/>
            <BoardCard key={board.boardId} board={board}/>
          </div>
        )
      }
    </div>
  );

}

export default BoardList;
