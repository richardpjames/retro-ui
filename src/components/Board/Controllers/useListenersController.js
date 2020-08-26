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
  const joinBoard = (board) => {
    if (board?.boardid) {
      // Set up socket connections - first join the room (and reconnect if needed)
      io.emit('join', board.boardid);
      io.on('connect', () => {
        io.emit('join', board.boardid);
      });
      return function cleanup() {
        io.emit('leave', board.boardid);
      };
    }
  };

  const setupListeners = () => {
    // Set up socket connections
    io.removeAllListeners('card created');
    // On any new cards then update
    io.on('card created', (card) => {
      const check = cards.find((c) => c.cardid === card.cardid);
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
        .filter((c) => c.cardid === updatedCard.cardid)
        .map(async (card) => {
          card.text = updatedCard.text;
          card.rank = updatedCard.rank;
          card.columnid = updatedCard.columnid;
          card.colour = updatedCard.colour;
          card.parentid = updatedCard.parentid;
        });

      // Sort the cards into order
      _cards = _cards.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        if (a.rank === b.rank && a.cardid > b.cardid) return 1;
        return -1;
      });
      // Update state with the re-ordered cards
      setCards(_cards);
    });

    io.removeAllListeners('card deleted');
    // For any deleted cards
    io.on('card deleted', (cardid) => {
      // Filter out the cards not deleted and update
      const _cards = cards.filter((c) => c.cardid !== parseInt(cardid));
      setCards(_cards);
      const _votes = votes.filter((v) => v.cardid !== parseInt(cardid));
      setVotes(_votes);
    });

    io.removeAllListeners('vote created');
    // On any new cards then update
    io.on('vote created', (vote) => {
      const check = votes.find((v) => v.voteid === vote.voteid);
      // If not then add it to the list
      if (!check) {
        setVotes([...votes, vote]);
      }
    });

    io.removeAllListeners('vote deleted');
    // For any deleted votes
    io.on('vote deleted', (voteid) => {
      // Filter out the cards not deleted and update
      const _votes = votes.filter((v) => v.voteid !== parseInt(voteid));
      setVotes(_votes);
    });

    io.removeAllListeners('action created');
    // For new columns
    io.on('action created', (action) => {
      const check = actions.find((a) => a.actionid === action.actionid);
      // If not then add it to the list
      if (!check) {
        let _actions = [...actions];
        _actions.push(action);
        // Sort them into order
        _actions = _actions.sort((a, b) => {
          if (a.due > b.due) {
            return 1;
          } else if (a.due === b.due) {
            if (a.actionid > b.actionid) {
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
    io.on('action deleted', (actionid) => {
      // Filter out the cards not deleted and update
      const _actions = actions.filter((a) => a.actionid !== parseInt(actionid));
      setActions(_actions);
    });

    io.removeAllListeners('column created');
    // For new columns
    io.on('column created', (column) => {
      const check = columns.find((c) => c.columnid === column.columnid);
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
        .filter((c) => c.columnid === updatedColumn.columnid)
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
    io.on('column deleted', (columnid) => {
      // Filter out the cards not deleted and update
      const _columns = columns.filter((c) => c.columnid !== parseInt(columnid));
      setColumns(_columns);
    });

    io.removeAllListeners('board updated');
    // For any updated cards
    io.on('board updated', (updatedBoard) => {
      // If teams have changed and this is now a private board then reload the page
      if (
        (board.teamid !== updatedBoard.teamid ||
          board.private !== updatedBoard.private) &&
        updatedBoard.private
      ) {
        window.location.reload(false);
      }
      // Update the board
      setBoard(updatedBoard);
    });

    // Recalculate the votes the user has remaining
    let votesUsed = votes.filter((v) => v.userid === profile.userid).length;
    setVotesRemaining(board.maxvotes - votesUsed);
  };

  return { joinBoard, setupListeners };
};

export default useListenersController;
