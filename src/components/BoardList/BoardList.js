import React, {useEffect, useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import axios from 'axios';
import BoardListDetails from "./BoardListDetails";

const BoardList = () => {
  const {getAccessTokenSilently} = useAuth0();
  const [boards, updateBoards] = useState([]);

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        axios.get(`${process.env.REACT_APP_API_URL}/api/boards`, config)
          .then((response) => {
            updateBoards(response.data);
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }, [getAccessTokenSilently]);

  return boards.map((board) => <BoardListDetails key={board.boardId} board={board} />);
}

export default BoardList;
