/* eslint array-callback-return: 0 */
import React, {useEffect, useState} from 'react';
import boardsService from "../../services/boardsService";
import cardsService from "../../services/cardsService";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import BoardColumn from "./BoardColumn";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import NewCardForm from "./NewCardForm";

const BoardPage = (props) => {

  const {getAccessTokenSilently} = useAuth0();
  const [board, setBoard] = useState({columns: []});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // This is the initial load of existing boards for the user
  useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          // Get the access token required to call the API
          const token = await getAccessTokenSilently();
          // Call the API
          let _board = await boardsService.getById(props.match.params.boardId, token)
          // Sort the columns
          _board.columns = _board.columns.sort((a, b) => {
            if (a.order > b.order) return 1;
            return -1;
          });
          // Get the required cards
          let _cards = await cardsService.getAll(props.match.params.boardId, token);
          // Sort them into order
          _cards = _cards.sort((a, b) => {
            if (a.order > b.order) return 1;
            return -1;
          });
          // Update the boards
          setBoard(_board);
          // Update the cards
          setCards(_cards);
          // Stop loading bar
          setLoading(false);
        } catch (error) {
          // For now just log any errors - TODO: Improve error handling
          console.log(error);
        }
      }
      fetchData();
    }, [getAccessTokenSilently, props.match.params.boardId]
  );

  const addCard = async (card) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Call the API
    const _newCard = await cardsService.create(board.boardId, card, token);
    // Add the new card to the list
    console.log([...cards, _newCard]);
    setCards([...cards, _newCard]);
  }

  const deleteCard = async (card) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Call the API
    await cardsService.remove(board.boardId, card.cardId, token)
    // Remove the card from the list
    const _cards = cards.filter(c => c.cardId !== card.cardId);
    // Re-order anything after that card on the list
    _cards.map(c => {
      if (c.columnId === card.columnId && c.order > card.order)
        c.order -= 1;
    });
    // Save changes to state
    console.log(_cards);
    setCards(_cards);
  }

  const handleDragEnd = (result) => {
    // Take the source and destination details from the result
    const {source, destination} = result;
    // If there is no destination then exit
    if (!destination) return;
    // Take a copy of the cards state
    let _cards = cards;
    // Iterate through the columns and cards to find the card moved, updating its position and column
    _cards.map((card) => {
      // If this is the card we moved then update the column and index
      if (card.cardId === result.draggableId) {
        card.order = destination.index;
        card.columnId = destination.droppableId;
      }
      // Otherwise if this is not the card that was moved we may need to adjust
      else {
        // If the card has moved within it's existing column, then we only need to adjust if the card is between the
        // from and two position (and only if the card is in this column)
        if (source.droppableId === destination.droppableId && card.columnId === source.droppableId) {
          // If the card has moved down the list
          if (destination.index > source.index && card.order <= destination.index && card.order > source.index) {
            card.order -= 1;
          }
          // If the card has moved up the list
          else if (destination.index < source.index && card.order < source.index && card.order >= destination.index) {
            card.order += 1;
          }
        }
        // If the card has moved to a different column, then we need to re-order both columns
        else {
          // If this card is on the source column, then we need to move the card down (if it appeared above the original)
          if (card.columnId === source.droppableId && card.order > source.index) {
            card.order -= 1;
          }
          // Otherwise if this card is for the column we moved to, and appeared above the card then move up
          else if (card.columnId === destination.droppableId && card.order > destination.index) {
            card.order += 1;
          }
        }
      }
    });
    // Sort the cards into order
    _cards = _cards.sort((a, b) => {
      if (a.order > b.order) return 1;
      return -1;
    });
    // Update state with the re-ordered cards
    console.log(_cards);
    setCards(_cards);
  }

  return (<div className="content mx-5 my-5">
    {(() => {
      if (loading) return <progress className="progress is-small is-primary my-5" max="100"></progress>
    })()}
    <h1 className="title is-1">{board.name}</h1>
    <p>{board.description}</p>
    <div className="columns">
      <DragDropContext onDragEnd={handleDragEnd}>
        {
          board.columns.map((column, index) => (
            <div key={column.columnId} className="card column mx-3 my-3">
              <h4 className="subtitle is-4 mx-3 my-3">{column.title}</h4>
              <NewCardForm addCard={addCard} column={column}/>
              <Droppable droppableId={column.columnId}>
                {(provided, snapshot) => (
                  <div
                    className="column-card"
                    ref={provided.innerRef}
                    {...provided.droppableProps} >
                    <BoardColumn deleteCard={deleteCard} cards={cards.filter(c => c.columnId === column.columnId)}/>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </div>
          ))
        }
      </DragDropContext>
    </div>
    <Link to="/dashboard" className="button">Back</Link>
  </div>);
}

export default BoardPage
