/* eslint array-callback-return: 0 */
import React, { useEffect, useState } from 'react';
import boardsService from '../../services/boardsService';
import cardsService from '../../services/cardsService';
import columnsService from '../../services/columnsService';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import BoardColumn from './BoardColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NewCardForm from './NewCardForm';
import { toast } from 'react-toastify';
import { LexoRank } from 'lexorank';

const BoardPage = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (showLoadingBar = false) => {
    try {
      setLoading(showLoadingBar);
      // Get the access token required to call the API
      const token = await getAccessTokenSilently();
      // Call the API
      let _board = await boardsService.getById(
        props.match.params.boardId,
        token,
      );
      let _columns = await columnsService.getAll(
        props.match.params.boardId,
        token,
      );
      // Sort the columns
      _columns = _columns.sort((a, b) => {
        if (a.order > b.order) return 1;
        return -1;
      });
      // Get the required cards
      let _cards = await cardsService.getAll(props.match.params.boardId, token);
      // Sort them into order
      _cards = _cards.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Update the boards
      setBoard(_board);
      // Update the columns
      setColumns(_columns);
      // Update the cards
      setCards(_cards);
      // Stop loading bar
      setLoading(false);
    } catch (error) {
      // For now just log any errors - TODO: Improve error handling
      toast.error(error);
    }
  };

  // This is the initial load of existing boards for the user
  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line
  }, []);

  const addCard = async (card) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Get the column from the card and then remove
    const columnId = card.columnId;
    // Set the rank based on the highest in the column
    const columnCards = cards.filter((c) => c.columnId === columnId);
    if (columnCards.length > 0) {
      const highestRank = columnCards[columnCards.length - 1].rank;
      const highestLexoRank = LexoRank.parse(highestRank);
      card.rank = highestLexoRank.genNext().toString();
    } else {
      card.rank = LexoRank.middle().toString();
    }
    // Call the API
    const _newCard = await cardsService.create(
      board._id,
      card.columnId,
      card,
      token,
    );
    // Add the new card to the list
    setCards([...cards, _newCard]);
  };

  const deleteCard = async (card) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Call the API
    await cardsService.remove(board._id, card.columnId, card._id, token);
    // Remove the card from the list
    const _cards = cards.filter((c) => c._id !== card._id);
    // Save changes to state
    setCards(_cards);
  };

  const handleDragEnd = (result) => {
    // Take the source and destination details from the result
    const { source, destination } = result;
    // If there is no destination then exit
    if (!destination) {
      return;
    }
    // Take a copy of the cards state
    let _cards = cards;
    // A variable for the new rank
    let newRank = LexoRank.middle().toString();

    // Find the cards in the column that was dragged to
    const columnCards = _cards.filter(
      (c) => c.columnId === destination.droppableId,
    );
    // If there is nothing in the column already then no action required
    // Otherwise set the new rank based on the existing card it replaces
    if (columnCards.length > 0) {
      let lowerRank = LexoRank.min();
      let higherRank = LexoRank.max();
      // If moving down the same list then the logic is slightly different
      if (
        source.droppableId === destination.droppableId &&
        source.index < destination.index
      ) {
        // If this isn't bottom top of the list then we can adjust the lower
        lowerRank = LexoRank.parse(columnCards[destination.index].rank);
        // The higher will replace the existing card that we slip above
        if (destination.index < columnCards.length - 1)
          higherRank = LexoRank.parse(columnCards[destination.index + 1].rank);
      } else {
        // If this isn't the top of the list then we can adjust the lower
        if (destination.index > 0)
          lowerRank = LexoRank.parse(columnCards[destination.index - 1].rank);
        // The higher will replace the existing card that we slip above
        if (destination.index <= columnCards.length - 1)
          higherRank = LexoRank.parse(columnCards[destination.index].rank);
      }
      newRank = lowerRank.between(higherRank).toString();
    }

    // Update the card that was dragged
    _cards
      .filter((c) => c._id === result.draggableId)
      .map(async (card) => {
        card.rank = newRank;
        card.columnId = destination.droppableId;
        const token = await getAccessTokenSilently();
        await cardsService.update(board._id, source.droppableId, card, token);
      });

    // Sort the cards into order
    _cards = _cards.sort((a, b) => {
      if (a.rank > b.rank) return 1;
      return -1;
    });
    // Update state with the re-ordered cards
    setCards(_cards);
  };

  return (
    <div className="content mx-5 my-5">
      {(() => {
        if (loading)
          return (
            <progress
              className="progress is-small is-primary my-5"
              max="100"
            ></progress>
          );
      })()}
      <h1 className="title is-1">{board.name}</h1>
      <p>{board.description}</p>
      <div className="columns">
        <DragDropContext onDragEnd={handleDragEnd}>
          {columns.map((column, index) => (
            <div key={column._id} className="card column mx-3 my-3">
              <h4 className="subtitle is-4 mx-3 my-3">{column.title}</h4>
              <NewCardForm addCard={addCard} column={column} />
              <Droppable droppableId={column._id}>
                {(provided, snapshot) => (
                  <div
                    className="column-card"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <BoardColumn
                      deleteCard={deleteCard}
                      cards={cards.filter((c) => c.columnId === column._id)}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
      <div className="buttons">
        <Link to="/dashboard" className="button">
          Back
        </Link>
        <button className="button is-light" onClick={() => fetchData(false)}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default BoardPage;
