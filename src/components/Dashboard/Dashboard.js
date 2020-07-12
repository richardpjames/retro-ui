import React, { useEffect, useState } from 'react';
import BoardList from './BoardList';
import NewBoard from './NewBoard';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import boardsService from '../../services/boardsService';

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [boards, updateBoards] = useState([]);
  const [loading, updateLoading] = useState(false);

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
        // Stop loading bar
        updateLoading(false);
      } catch (error) {
        // For now just log any errors - TODO: Improve error handling
        toast.error(error);
      }
    };
    fetchData();
  }, [getAccessTokenSilently]);

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
      <h1 className="title is-1 mt-3">Your Boards</h1>
      <p>
        View an existing board, or create a new one. Your most recent boards are
        shown at the top of the page.
      </p>
      <div className="columns mt-3">
        <div className="column">
          <h3 className="title is-3">Create New</h3>
          <p>
            Creating a new board is as simple as picking a name, giving a
            description and then choosing one of the starter templates to get
            going. Once the board is created you can add/change the columns and
            descriptions.
          </p>
          <NewBoard boards={boards} addBoard={addBoard} />
        </div>
        <div className="column">
          <h3 className="title is-3">Existing Boards</h3>
          <p>
            These are the boards from your previous retrospectives, which are
            kept here until you choose to delete them.
          </p>
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
        <div className="column">
          <h3 className="title is-3">Our Templates</h3>
          <p>
            Learn how to run a fun and effective retrospective with each of our
            built in templates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
