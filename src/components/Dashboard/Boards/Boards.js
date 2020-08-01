import React from 'react';
import BoardList from './BoardList';
import NewBoardModal from './NewBoardModal';

const Boards = (props) => {
  return (
    <div className="content mx-5 my-5">
      <div
        className="columns is-vcentered mb-0
      "
      >
        <div className="column py-0">
          <h1 className="title is-1 mt-3">Your Boards</h1>
        </div>
        <div className="column py-0 is-narrow">
          <button
            className="button is-primary"
            onClick={() => {
              props.setCreateBoardModalVisible(true);
            }}
          >
            <i className="fas fa-plus mr-3"></i> Create New
          </button>
        </div>
      </div>
      <p className="mt-0">
        View an existing board, or create a new one. Your most recent boards are
        shown at the top of the page.
      </p>
      <NewBoardModal
        boards={props.boards}
        profile={props.profile}
        addBoard={props.addBoard}
        visible={props.createBoardModalVisible}
        setVisible={props.setCreateBoardModalVisible}
      />
      <div className="content">
        <BoardList boards={props.boards} removeBoard={props.removeBoard} />
      </div>
    </div>
  );
};

export default Boards;
