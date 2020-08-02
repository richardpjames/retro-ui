/* eslint array-callback-return: 0 */
import React, { useEffect, useState } from 'react';
import boardsService from '../../services/boardsService';
import cardsService from '../../services/cardsService';
import columnsService from '../../services/columnsService';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import BoardColumn from './BoardColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NewCardForm from './NewCardForm';
import { toast } from 'react-toastify';
import { LexoRank } from 'lexorank';
import io from '../../services/socket';
import LoadingSpinner from '../Common/LoadingSpinner';

const BoardPage = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragDisabled, setDragDisabled] = useState(false);

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
    // Fetch initial data
    fetchData(true);
    // Set up socket connections - first join the room (and reconnect if needed)
    io.emit('join', props.match.params.boardId);
    io.on('connect', () => {
      io.emit('join', props.match.params.boardId);
    });
    return function cleanup() {
      io.emit('leave', props.match.params.boardId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  io.removeAllListeners('card created');
  // On any new cards then update
  io.on('card created', (card) => {
    const check = cards.find((c) => c._id === card._id);
    // If not then add it to the list
    if (!check) {
      setCards([...cards, card]);
    }
  });

  useEffect(() => {
    io.removeAllListeners('card updated');
    // For any updated cards
    io.on('card updated', (updatedCard) => {
      // Take a copy of the cards state
      let _cards = [...cards];
      // Update the card that was dragged
      _cards
        .filter((c) => c._id === updatedCard._id)
        .map(async (card) => {
          card.text = updatedCard.text;
          card.rank = updatedCard.rank;
          card.columnId = updatedCard.columnId;
        });

      // Sort the cards into order
      _cards = _cards.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Update state with the re-ordered cards
      setCards(_cards);
    });

    io.removeAllListeners('card deleted');
    // For any deleted cards
    io.on('card deleted', (cardId) => {
      // Filter out the cards not deleted and update
      const _cards = cards.filter((c) => c._id !== cardId);
      setCards(_cards);
    });
  }, [cards]);

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
    cardsService.remove(board._id, card.columnId, card._id, token);
    // Remove the card from the list
    const _cards = cards.filter((c) => c._id !== card._id);
    // Save changes to state
    setCards(_cards);
  };

  const updateCard = async (card) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Call the api
    cardsService.update(board._id, card.columnId, card, token);
    // Take a copy of the cards state
    let _cards = [...cards];
    // Update the card that was updated
    _cards
      .filter((c) => c._id === card._id)
      .map(async (c2) => {
        c2.text = card.text;
        c2.rank = card.rank;
        c2.columnId = card.columnId;
      });
    // Sort the cards into order
    _cards = _cards.sort((a, b) => {
      if (a.rank > b.rank) return 1;
      return -1;
    });
    // Update state with the re-ordered cards
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
    let _cards = [...cards];
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
        cardsService.update(board._id, source.droppableId, card, token);
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
        if (loading) return <LoadingSpinner />;
      })()}
      <div className="columns is-vcentered">
        <div className="column">
          <h1 className="title is-4">{board.name}</h1>
        </div>
        <div className="column is-narrow">
          <div className="buttons">
            <button
              className="button is-rounded has-tooltip-primary"
              onClick={() => fetchData(false)}
              data-tooltip="Refresh Data"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
            <Link to={props.dashboardPath}>
              <button
                className="button is-rounded has-tooltip-primary"
                data-tooltip="Back to Dashboard"
              >
                <i className="fas fa-home"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="columns board-columns">
        <DragDropContext onDragEnd={handleDragEnd}>
          {columns.map((column, index) => (
            <div
              key={column._id}
              className="card column board-column mx-1 my-1"
            >
              <h4 className="subtitle is-4 ml-0 mr-3 mb-3 mt-0">
                {column.title}
              </h4>
              <NewCardForm addCard={addCard} column={column} />
              <Droppable droppableId={column._id}>
                {(provided) => (
                  <div
                    className="is-fullheight"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <BoardColumn
                      deleteCard={deleteCard}
                      updateCard={updateCard}
                      dragDisabled={dragDisabled}
                      setDragDisabled={setDragDisabled}
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
    </div>
  );
};

export default withAuthenticationRequired(BoardPage);
