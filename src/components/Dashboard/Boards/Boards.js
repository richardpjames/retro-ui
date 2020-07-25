import React, { useEffect, useState } from 'react';
import BoardList from './BoardList';
import NewBoardModal from './NewBoardModal';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import boardsService from '../../../services/boardsService';
import usersService from '../../../services/usersService';

const Boards = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [boards, updateBoards] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, updateLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // This is the initial load of existing boards for the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        updateLoading(true);
        // Get the access token required to call the API
        const token = await getAccessTokenSilently();
        // Call the API
        const boards = await boardsService.getAll(token);
        // Update the boards
        if (boards) {
          // Sort the boards
          const _boards = boards.sort((a, b) => {
            if (a.created < b.created) return 1;
            return -1;
          });
          updateBoards(_boards);
        }
        const profile = await usersService.getById(user.sub, token);
        setProfile(profile);
        // Stop loading bar
        updateLoading(false);
      } catch (error) {
        // For now just log any errors - TODO: Improve error handling
        console.log(error);
        toast.error(error);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, user]);

  const addBoard = async (board) => {
    try {
      updateLoading(true);
      // Get the access token required to call the API
      const token = await getAccessTokenSilently();
      const newBoard = await boardsService.create(board, token);
      // Add the new board returned to the existing list
      updateBoards([newBoard, ...boards]);
      updateLoading(false);
      // Show confirmation to the user
      toast.success('Your new board has been created.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  const removeBoard = async (boardId) => {
    try {
      updateLoading(true);
      // Get the access token and call the delete endpoint
      const token = await getAccessTokenSilently();
      await boardsService.remove(boardId, token);
      // Remove the board from the state
      let updatedBoards = boards.filter((board) => {
        return board._id !== boardId;
      });
      updateBoards(updatedBoards);
      updateLoading(false);
      toast.success('Your board has been deleted.');
    } catch (error) {
      // For now just output any errors
      toast.error(error);
    }
  };

  return (
    <div className="content mx-5 my-5">
      <div className="columns is-vcentered">
        <div className="column py-0">
          <h1 className="title is-1 mt-3">Retrospective Boards</h1>
        </div>
        <div className="column py-0 is-narrow">
          <button
            className="button is-primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <i className="fas fa-plus mr-3"></i> Create New
          </button>
        </div>
      </div>
      <p>
        View an existing board, or create a new one. Your most recent boards are
        shown at the top of the page.
      </p>
      <NewBoardModal
        boards={boards}
        profile={profile}
        addBoard={addBoard}
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
      />
      <div className="content">
        {(() => {
          if (loading)
            return (
              <progress
                className="progress is-small is-primary my-5"
                max="100"
              ></progress>
            );
        })()}
        <BoardList boards={boards} removeBoard={removeBoard} />
      </div>
    </div>
  );
};

export default Boards;
