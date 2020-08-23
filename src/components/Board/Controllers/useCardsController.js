import cardsService from '../../../services/cardsService';
import { LexoRank } from 'lexorank';

const useCardsController = (board, cards, setCards) => {
  const addCard = async (card) => {
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
      board.boardid,
      card.columnId,
      card,
    );
    // Add the new card to the list
    setCards([...cards, _newCard]);
  };

  const deleteCard = async (card) => {
    // Call the API
    cardsService.remove(board.boardid, card.columnId, card._id);
    // Remove the card from the list
    const _cards = cards.filter((c) => c._id !== card._id);
    // Save changes to state
    setCards(_cards);
  };

  const updateCard = async (card) => {
    // Call the api
    cardsService.update(board.boardid, card.columnId, card);
    // Take a copy of the cards state
    let _cards = [...cards];
    // Update the card that was updated
    _cards
      .filter((c) => c._id === card._id)
      .map(async (c2) => {
        c2.text = card.text;
        c2.rank = card.rank;
        c2.columnId = card.columnId;
        c2.colour = card.colour;
      });
    // Sort the cards into order
    _cards = _cards.sort((a, b) => {
      if (a.rank > b.rank) return 1;
      return -1;
    });
    // Update state with the re-ordered cards
    setCards(_cards);
  };

  const combineCards = async (parentCard, childCard) => {
    // Initialise the array on the object if not already
    if (!parentCard.combinedCards) {
      parentCard.combinedCards = [];
    }
    // Add the child card to the parent
    parentCard.combinedCards.push({
      userId: childCard.userId,
      text: childCard.text,
      colour: childCard.colour,
    });
    // Merge any already merged cards
    if (childCard.combinedCards) {
      await Promise.all(
        childCard.combinedCards.map((_card) =>
          parentCard.combinedCards.push({
            userId: _card.userId,
            text: _card.text,
            colour: _card.colour,
          }),
        ),
      );
    }
    // Remove the child card from the board
    const _cards = cards.filter((c) => c._id !== childCard._id);
    // Update the parent card
    cardsService.update(parentCard.boardId, parentCard.columnId, parentCard);
    // Remove the child card
    cardsService.remove(childCard.boardId, childCard.columnId, childCard._id);
    // Update the state
    setCards(_cards);
  };

  const separateCards = async (card, index) => {
    // Remove from the parent card

    const _updatedCard = { ...card };
    const _newCard = { ...card.combinedCards[index] };

    _updatedCard.combinedCards.splice(index, 1);
    // Update at the service
    await cardsService.update(
      _updatedCard.boardId,
      _updatedCard.columnId,
      _updatedCard,
    );
    // Create a new card from the merged card
    await addCard({
      ..._newCard,
      columnId: card.columnId,
      combinedCards: [],
    });
  };

  return { addCard, deleteCard, updateCard, combineCards, separateCards };
};

export default useCardsController;
