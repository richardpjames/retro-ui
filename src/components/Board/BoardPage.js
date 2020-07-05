import React, {useEffect, useState} from 'react';
import boardsService from "../../services/boardsService";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";

const BoardPage = (props) => {

  const {getAccessTokenSilently} = useAuth0();
  const [board, updateBoard] = useState({columns: []});
  const [loading, updateLoading] = useState(false);

  // This is the initial load of existing boards for the user
  useEffect(() => {
      const fetchData = async () => {
        try {
          updateLoading(true);
          // Get the access token required to call the API
          const token = await getAccessTokenSilently();
          // Call the API
          const board = await boardsService.getById(props.match.params.boardId, token)
          // Update the boards
          updateBoard(board);
          // Stop loading bar
          updateLoading(false);
        } catch (error) {
          // For now just log any errors - TODO: Improve error handling
          console.log(error);
        }
      }
      fetchData();
    }, [getAccessTokenSilently]
  );

  return (<div className="content mx-5 my-5">
    <h1 className="title is-1">{board.name}</h1>
    <p>{board.description}</p>
    <div className="columns">
      {
        board.columns.map((column) => {
        console.log(column);
        return (<div key={column.columnId} className="column">
          <div className="card">
            <div className="card-content">
              <h5 className="subtitle is-5">{column.title}</h5>
            </div>
          </div>
        </div>);
      })}
    </div>
    <Link to="/dashboard" className="button">Back</Link>
  </div>);
}

export default BoardPage
