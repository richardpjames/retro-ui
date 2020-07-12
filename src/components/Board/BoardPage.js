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
        if (a.order > b.order) return 1;
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
    delete card.columnId;
    // Call the API
    const _newCard = await cardsService.create(
      board._id,
      columnId,
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
    await cardsService.remove(board._id, card.columnId, card.cardId, token);
    // Remove the card from the list
    const _cards = cards.filter((c) => c.cardId !== card.cardId);
    // Re-order anything after that card on the list
    _cards.map((c) => {
      if (c.columnId === card.columnId && c.order > card.order) c.order -= 1;
    });
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

    // Update the card that was dragged
    _cards
      .filter((c) => c.cardId === result.draggableId)
      .map(async (card) => {
        card.order = destination.index;
        card.columnId = destination.droppableId;
        const token = await getAccessTokenSilently();
        await cardsService.update(board._id, card, token);
      });

    // If moved within the existing column then we only need to adjust between the from and to index
    if (source.droppableId === destination.droppableId) {
      // These are cards will be moved down the list
      _cards
        .filter(
          (c) =>
            c.cardId !== result.draggableId &&
            c.columnId === source.droppableId &&
            c.order > source.index,
        )
        .map((card) => (card.order -= 1));
      // These cards will be moved up the list
      _cards
        .filter(
          (c) =>
            c.cardId !== result.draggableId &&
            c.columnId === source.droppableId &&
            c.order >= destination.index,
        )
        .map((card) => (card.order += 1));
    }
    // Otherwise if the card moved between columns
    else {
      // These are cards that have moved down the list
      _cards
        .filter(
          (c) =>
            c.cardId !== result.draggableId &&
            c.columnId === source.droppableId &&
            c.order > source.index,
        )
        .map((card) => (card.order -= 1));
      // These are cards that have moved up the list
      _cards
        .filter(
          (c) =>
            c.cardId !== result.draggableId &&
            c.columnId === destination.droppableId &&
            c.order >= destination.index,
        )
        .map((card) => (card.order += 1));
    }

    // Sort the cards into order
    _cards = _cards.sort((a, b) => {
      if (a.order > b.order) return 1;
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
