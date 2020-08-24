import cardsService from '../../../services/cardsService';
import { LexoRank } from 'lexorank';

const useCardsController = (board, cards, setCards) => {
  const addCard = async (card) => {
    // Get the column from the card and then remove
    const columnid = card.columnid;
    // Set the rank based on the highest in the column
    const columnCards = cards.filter((c) => c.columnid === columnid);
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
      card.columnid,
      card,
    );
    // Add the new card to the list
    setCards([...cards, _newCard]);
  };

  const deleteCard = async (card) => {
    // Call the API
    cardsService.remove(board.boardid, card.columnid, card.cardid);
    // Remove the card from the list
    const _cards = cards.filter((c) => c.cardid !== card.cardid);
    // Save changes to state
    setCards(_cards);
  };

  const updateCard = async (card) => {
    // Call the api
    cardsService.update(board.boardid, card.columnid, card);
    // Take a copy of the cards state
    let _cards = [...cards];
    // Update the card that was updated
    _cards
      .filter((c) => c.cardid === card.cardid)
      .map(async (c2) => {
        c2.text = card.text;
        c2.rank = card.rank;
        c2.columnid = card.columnid;
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
      userid: childCard.userid,
      text: childCard.text,
      colour: childCard.colour,
    });
    // Merge any already merged cards
    if (childCard.combinedCards) {
      await Promise.all(
        childCard.combinedCards.map((_card) =>
          parentCard.combinedCards.push({
            userid: _card.userid,
            text: _card.text,
            colour: _card.colour,
          }),
        ),
      );
    }
    // Remove the child card from the board
    const _cards = cards.filter((c) => c.cardid !== childCard.cardid);
    // Update the parent card
    cardsService.update(parentCard.boardid, parentCard.columnid, parentCard);
    // Remove the child card
    cardsService.remove(
      childCard.boardid,
      childCard.columnid,
      childCard.cardid,
    );
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
      _updatedCard.boardid,
      _updatedCard.columnid,
      _updatedCard,
    );
    // Create a new card from the merged card
    await addCard({
      ..._newCard,
      columnid: card.columnid,
      combinedCards: [],
    });
  };

  return { addCard, deleteCard, updateCard, combineCards, separateCards };
};

export default useCardsController;
