import React, { useState } from 'react';
import DeleteBoardModal from './DeleteBoardModal';
import BoardCard from './BoardCard';

const BoardList = (props) => {
  const [boardToDelete, updateBoardToDelete] = useState({
    _id: '',
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
      {props.boards.map((board) => (
        <div className="my-3" key={board._id}>
          <BoardCard
            board={board}
            updateModalVisible={updateModalVisible}
            updateBoardToDelete={updateBoardToDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default BoardList;
