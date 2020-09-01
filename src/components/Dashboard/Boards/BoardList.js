import React, { useState } from 'react';
import DeleteBoardModal from './DeleteBoardModal';
import BoardCard from './BoardCard';

const BoardList = (props) => {
  const [boardToDelete, updateBoardToDelete] = useState({
    boardid: '',
    name: '',
  });
  const [modalVisible, updateModalVisible] = useState(false);

  return (
    <div>
      <DeleteBoardModal
        board={boardToDelete}
        removeBoard={props.removeBoard}
        visible={modalVisible}
        updateModalVisible={updateModalVisible}
      />
      {props.boards.length === 0 && (
        <p>There are currently no boards to show.</p>
      )}
      {props.boards.map((board) => (
        <div className="my-3" key={board.boardid}>
          <BoardCard
            board={board}
            profile={props.profile}
            updateModalVisible={updateModalVisible}
            updateBoardToDelete={updateBoardToDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default BoardList;
