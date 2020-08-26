import { LexoRank } from 'lexorank';
import useCardsService from '../../../services/useCardsService';
import useColumnsService from '../../../services/columnsService';

const useDragDropController = (
  board,
  cards,
  columns,
  setCards,
  setColumns,
  setParentCard,
  setChildCard,
  setMergeCardModalVisible,
) => {
  const cardsService = useCardsService();
  const columnsService = useColumnsService();

  const handleDragEnd = (result) => {
    // Take the source and destination details from the result
    const { source, destination } = result;

    // If combined
    if (result.combine) {
      setParentCard(
        cards.find(
          (c) => c.cardid === parseInt(result.combine.draggableId.substring(4)),
        ),
      );
      setChildCard(
        cards.find(
          (c) => c.cardid === parseInt(result.draggableId.substring(4)),
        ),
      );
      setMergeCardModalVisible(true);
    }

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
        .filter((c) => c.columnid === parseInt(result.draggableId.substring(4)))
        .map(async (column) => {
          column.rank = newRank;
          columnsService.update(board.boardid, column);
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
      (c) => c.columnid === parseInt(destination.droppableId),
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
      .filter((c) => c.cardid === parseInt(result.draggableId.substring(4)))
      .map(async (card) => {
        card.rank = newRank;
        card.columnid = parseInt(destination.droppableId);
        cardsService.update(board.boardid, source.droppableId, card);
      });

    // Sort the cards into order
    _cards = _cards.sort((a, b) => {
      if (a.rank > b.rank) return 1;
      if (a.rank === b.rank && a.cardid > b.cardid) return 1;
      return -1;
    });
    // Update state with the re-ordered cards
    setCards(_cards);
  };

  return { handleDragEnd };
};

export default useDragDropController;
