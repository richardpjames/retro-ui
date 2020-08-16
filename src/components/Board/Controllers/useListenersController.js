const useListenersController = (
  io,
  cards,
  votes,
  board,
  profile,
  columns,
  actions,
  setActions,
  setBoard,
  setCards,
  setColumns,
  setVotes,
  setVotesRemaining,
) => {
  const joinBoard = (props) => {
    // Set up socket connections - first join the room (and reconnect if needed)
    io.emit('join', props.match.params.boardId);
    io.on('connect', () => {
      io.emit('join', props.match.params.boardId);
    });
    return function cleanup() {
      io.emit('leave', props.match.params.boardId);
    };
  };

  const setupListeners = () => {
    // Set up socket connections
    io.removeAllListeners('card created');
    // On any new cards then update
    io.on('card created', (card) => {
      const check = cards.find((c) => c._id === card._id);
      // If not then add it to the list
      if (!check) {
        console.log(card);
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
          card.colour = updatedCard.colour;
          card.combinedCards = updatedCard.combinedCards;
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

    io.removeAllListeners('action created');
    // For new columns
    io.on('action created', (action) => {
      const check = actions.find((a) => a._id === action._id);
      // If not then add it to the list
      if (!check) {
        let _actions = [...actions];
        _actions.push(action);
        // Sort them into order
        _actions = _actions.sort((a, b) => {
          if (a.due > b.due) {
            return 1;
          } else if (a.due === b.due) {
            if (a._id > b._id) {
              return 1;
            }
            return -1;
          }
          return -1;
        });
        setActions(_actions);
      }
    });

    io.removeAllListeners('action deleted');
    // For any deleted votes
    io.on('action deleted', (actionId) => {
      // Filter out the cards not deleted and update
      const _actions = actions.filter((a) => a._id !== actionId);
      setActions(_actions);
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

    io.removeAllListeners('board updated');
    // For any updated cards
    io.on('board updated', (updatedBoard) => {
      // Update the board
      console.log(updatedBoard);
      setBoard(updatedBoard);
    });

    // Recalculate the votes the user has remaining
    let votesUsed = votes.filter((v) => v.userId === profile.id).length;
    setVotesRemaining(board.maxVotes - votesUsed);
  };

  return { joinBoard, setupListeners };
};

export default useListenersController;
