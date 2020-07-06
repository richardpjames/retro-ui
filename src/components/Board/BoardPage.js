import React, {useEffect, useState} from 'react';
import boardsService from "../../services/boardsService";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import BoardColumn from "./BoardColumn";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';

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
          // Sort the columns
          board.columns = board.columns.sort((a, b) => {
            if (a.order > b.order) return 1;
            return -1;
          });
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
    }, [getAccessTokenSilently, props.match.params.boardId]
  );

  const handleDragEnd = (result) => {

    const {source, destination} = result;

    // If there is no destination then exit
    if (!destination) return;

    // Find the details for the card we are going to move
    let movedCard;
    // Iterate through the columns and cards to find the card moved
    board.columns.map((column) => {
      column.cards.map((card) => {
        // If this is the card we need then take a copy
        if (card.cardId === result.draggableId) {
          movedCard = {...card};
        }
      });
    });
    // Set the order for the card depending on where it was placed
    movedCard.order = destination.index + 1;
    // Create a copy of the board that we are going to update
    const updatedBoard = {...board};

    updatedBoard.columns.map((column) => {
        // Remove the card from the source
        if (column.columnId === source.droppableId) {
          column.cards = column.cards.filter(card => card.cardId !== result.draggableId);
          // Re-order anything above the old position
          column.cards.map((card) => {
            if (card.order > source.index) card.order -= 1;
          });
          // Sort the cards
          column.cards = column.cards.sort((a, b) => {
            if (a.order > b.order) return 1;
            return -1;
          });
        }
        // Add the card to the destination column
        if (column.columnId === destination.droppableId) {
          // Re-order anything above the new position
          column.cards.map((card) => {
              if (card.order > destination.index) card.order += 1;
            }
          );
          // Add the new card in
          column.cards.push(movedCard);
          // Sort the cards
          column.cards = column.cards.sort((a, b) => {
            if (a.order > b.order) return 1;
            return -1;
          });
        }
      }
    );
    console.log(updatedBoard);
    // Replace the board with the updated version
    updateBoard(updatedBoard);
  }

  return (<div className="content mx-5 my-5">
    <h1 className="title is-1">{board.name}</h1>
    <p>{board.description}</p>
    <div className="columns">
      <DragDropContext onDragEnd={handleDragEnd}>
        {
          board.columns.map((column, index) => (
            <Droppable key={column.columnId} droppableId={column.columnId}>
              {(provided, snapshot) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps} >
                  <BoardColumn column={column}/>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        }
      </DragDropContext>
    </div>
    <Link to="/dashboard" className="button">Back</Link>
  </div>);
}

export default BoardPage
