import React, {useEffect, useState} from 'react';
import BoardList from "./BoardList";
import NewBoard from "./NewBoard";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

const Boards = () => {
  const {getAccessTokenSilently} = useAuth0();
  const [boards, updateBoards] = useState([]);

  // This is the initial load of existing boards for the user
  useEffect(() => {
    // Get the access token required to call the API
    getAccessTokenSilently()
      .then((token) => {
        // Add that token to the authorization header as a bearer token
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        // This environment variable holds the beginning of the API url, config adds the header
        axios.get(`${process.env.REACT_APP_API_URL}/api/boards`, config)
          // Overwrite the boards object with the results
          .then((response) => {
            updateBoards(response.data);
          })
          // Log any errors to the console TODO: Improve error handling
          .catch((error) => console.log(error))
      })
      // Log any errors to the console TODO: Improve error handling
      .catch((error) => console.log(error))
  }, [getAccessTokenSilently]);

  const addBoard = (board) => {
    board.maxVotes = 5;
    // Get the access token required to call the API
    getAccessTokenSilently()
      .then((token) => {
        // Add that token to the authorization header as a bearer token
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        // This environment variable holds the beginning of the API url, config adds the header
        axios.post(`${process.env.REACT_APP_API_URL}/api/boards`, board, config)
          // Overwrite the boards object with the results
          .then((response) => {
            updateBoards([response.data, ...boards]);
          })
          // Log any errors to the console TODO: Improve error handling
          .catch((error) => console.log(error))
      })
      // Log any errors to the console TODO: Improve error handling
      .catch((error) => console.log(error))
    // TODO: Add API call to add the board
  };

  return (<div className="container my-3">
    <h1>Your Boards</h1>
    <p>View an existing board, or create a new one. Your most recent boards are shown
      at the top of the page.</p>
    <h3>Create New</h3>
    <NewBoard addBoard={addBoard}/>
    <h3>Existing Boards</h3>
    <BoardList boards={boards}/>
  </div>);
}

export default Boards;
