/* eslint array-callback-return: 0 */
import React, { useEffect, useState } from 'react';
import boardsService from '../../services/boardsService';
import cardsService from '../../services/cardsService';
import columnsService from '../../services/columnsService';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { LexoRank } from 'lexorank';
import io from '../../services/socket';
import LoadingSpinner from '../Common/LoadingSpinner';
import votesService from '../../services/votesService';
import usersService from '../../services/usersService';
import DeleteCardModal from './DeleteCardModal';
import CreateColumnModal from './CreateColumnModal';
import DeleteColumnModal from './DeleteColumnModal';
import BoardTitleBar from './BoardTitleBar';

import Board from './Board';

const BoardPage = (props) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const [votes, setVotes] = useState([]);
  const [votesRemaining, setVotesRemaining] = useState(0);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [dragDisabled, setDragDisabled] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [deleteCardModalVisible, setDeleteCardModalVisible] = useState(false);
  const [createColumnModalVisible, setCreateColumnModalVisible] = useState(
    false,
  );
  const [columnToDelete, setColumnToDelete] = useState({});
  const [deleteColumnModalVisible, setDeleteColumnModalVisible] = useState(
    false,
  );

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
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Get the required cards
      let _cards = await cardsService.getAll(props.match.params.boardId, token);
      // Sort them into order
      _cards = _cards.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Get the required votes (no need to sort etc. for these)
      let _votes = await votesService.getAll(props.match.params.boardId, token);
      // Get the user profile
      const profile = await usersService.getById(user.sub, token);
      setProfile(profile);
      // Update the boards
      setBoard(_board);
      // Update the columns
      setColumns(_columns);
      // Update the cards
      setCards(_cards);
      // Update the votes
      setVotes(_votes);
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

  useEffect(() => {
    io.removeAllListeners('card created');
    // On any new cards then update
    io.on('card created', (card) => {
      const check = cards.find((c) => c._id === card._id);
      // If not then add it to the list
      if (!check) {
        setCards([...cards, card]);
      }
    });

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
      const _votes = votes.filter((v) => v.cardId !== cardId);
      setVotes(_votes);
    });

    io.removeAllListeners('vote created');
    // On any new cards then update
    io.on('vote created', (vote) => {
      const check = votes.find((v) => v._id === vote._id);
      // If not then add it to the list
      if (!check) {
        setVotes([...votes, vote]);
      }
    });

    io.removeAllListeners('vote deleted');
    // For any deleted votes
    io.on('vote deleted', (voteId) => {
      // Filter out the cards not deleted and update
      const _votes = votes.filter((v) => v._id !== voteId);
      setVotes(_votes);
    });

    io.removeAllListeners('column created');
    // For new columns
    io.on('column created', (column) => {
      const check = columns.find((c) => c._id === column._id);
      // If not then add it to the list
      if (!check) {
        setColumns([...columns, column]);
      }
    });

    io.removeAllListeners('column updated');
    // For any updated columns
    io.on('column updated', (updatedColumn) => {
      // Take a copy of the columns state
      let _columns = [...columns];
      // Update the card that was dragged
      _columns
        .filter((c) => c._id === updatedColumn._id)
        .map(async (column) => {
          column.title = updatedColumn.title;
          column.rank = updatedColumn.rank;
        });

      // Sort the columns into order
      _columns = _columns.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Update state with the re-ordered columns
      setColumns(_columns);
    });

    io.removeAllListeners('column deleted');
    // For any deleted cards
    io.on('column deleted', (columnId) => {
      // Filter out the cards not deleted and update
      const _columns = columns.filter((c) => c._id !== columnId);
      setColumns(_columns);
    });

    // Recalculate the votes the user has remaining
    let votesUsed = votes.filter((v) => v.userId === profile.id).length;
    setVotesRemaining(board.maxVotes - votesUsed);
  }, [cards, votes, board, profile, columns]);

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

  const addVote = async (vote) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Call the API
    const _newVote = await votesService.create(
      board._id,
      vote.cardId,
      vote,
      token,
    );
    // Add the new card to the list
    setVotes([...votes, _newVote]);
  };

  const deleteVote = async (voteId, cardId) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Call the API
    votesService.remove(board._id, cardId, voteId, token);
    // Remove the card from the list
    const _votes = votes.filter((v) => v._id !== voteId);
    // Save changes to state
    setVotes(_votes);
  };

  const addColumn = async (column) => {
    const token = await getAccessTokenSilently();
    // Generate the rank based on the number of columns
    if (columns.length > 0) {
      const highestRank = columns[columns.length - 1].rank;
      const highestLexoRank = LexoRank.parse(highestRank);
      column.rank = highestLexoRank.genNext().toString();
    } else {
      column.rank = LexoRank.middle().toString();
    }
    // Get the new column from the service
    const newColumn = await columnsService.create(column, board._id, token);
    // Now add to the existing columns
    const _columns = [...columns];
    _columns.push(newColumn);
    setColumns(_columns);
  };

  const renameColumn = async (column) => {
    const token = await getAccessTokenSilently();
    // Rename the column in the service
    columnsService.update(board._id, column, token);
    // Rename the column in the list
    const _columns = [...columns];
    const updatedColumn = _columns.find((c) => c._id === column._id);
    updatedColumn.title = column.title;
    setColumns(_columns);
  };

  const deleteColumn = async (columnId) => {
    const token = await getAccessTokenSilently();
    // Remove the column from the service
    columnsService.remove(board._id, columnId, token);
    // Remove the column from the list
    const _columns = columns.filter((c) => c._id !== columnId);
    setColumns(_columns);
    // Remove any cards
    const _cards = cards.filter((c) => c.columnId !== columnId);
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
    // Take a copy of the columns state
    let _columns = [...columns];
    // A variable for the new rank
    let newRank = LexoRank.middle().toString();

    // If this is movement of a column
    if (destination.droppableId === 'board') {
      // Get the limits of the lexorank system
      let lowerRank = LexoRank.min();
      let higherRank = LexoRank.max();
      // If moving down the list
      if (source.index < destination.index) {
        lowerRank = LexoRank.parse(_columns[destination.index].rank);
        if (destination.index < _columns.length - 1) {
          higherRank = LexoRank.parse(_columns[destination.index + 1].rank);
        }
      } else {
        // If this isn't the top of the list then we can adjust the lower
        if (destination.index > 0)
          lowerRank = LexoRank.parse(_columns[destination.index - 1].rank);
        // The higher will replace the existing card that we slip above
        if (destination.index <= _columns.length - 1)
          higherRank = LexoRank.parse(_columns[destination.index].rank);
      }
      // Find the new rank for the column
      newRank = lowerRank.between(higherRank).toString();
      // Update the column that was dragged
      _columns
        .filter((c) => c._id === result.draggableId)
        .map(async (column) => {
          column.rank = newRank;
          const token = await getAccessTokenSilently();
          columnsService.update(board._id, column, token);
        });

      // Sort the cards into order
      _columns = _columns.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Set the state
      setColumns(_columns);
      return;
    }

    // Otherwise this is the movement of a card
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

      <DeleteCardModal
        card={cardToDelete}
        visible={deleteCardModalVisible}
        setModalVisible={setDeleteCardModalVisible}
        removeCard={deleteCard}
      />
      <CreateColumnModal
        visible={createColumnModalVisible}
        setVisible={setCreateColumnModalVisible}
        addColumn={addColumn}
      />
      <DeleteColumnModal
        column={columnToDelete}
        visible={deleteColumnModalVisible}
        setModalVisible={setDeleteColumnModalVisible}
        removeColumn={deleteColumn}
      />

      <BoardTitleBar
        board={board}
        profile={profile}
        votesRemaining={votesRemaining}
        dashboardPath={props.dashboardPath}
        setCreateColumnModalVisible={setCreateColumnModalVisible}
      />

      <Board
        board={board}
        profile={profile}
        columns={columns}
        cards={cards}
        votes={votes}
        handleDragEnd={handleDragEnd}
        setColumnToDelete={setColumnToDelete}
        setDeleteColumnModalVisible={setDeleteColumnModalVisible}
        addCard={addCard}
        updateCard={updateCard}
        addVote={addVote}
        deleteVote={deleteVote}
        votesRemaining={votesRemaining}
        setCreateColumnModalVisible={setCreateColumnModalVisible}
        dragDisabled={dragDisabled}
        setDragDisabled={setDragDisabled}
        setCardToDelete={setCardToDelete}
        setDeleteCardModalVisible={setDeleteCardModalVisible}
        renameColumn={renameColumn}
      />
    </div>
  );
};

export default withAuthenticationRequired(BoardPage);
