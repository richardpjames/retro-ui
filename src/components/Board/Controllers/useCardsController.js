import { LexoRank } from 'lexorank';
import useCardsService from '../../../services/useCardsService';

const useCardsController = (board, cards, setCards) => {
  const cardsService = useCardsService();

  const addCard = async (card) => {
    console.log(card);
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
    // Remove the card from the list (and any children)
    const _cards = cards.filter(
      (c) => c.cardid !== card.cardid && c.parentid !== card.cardid,
    );
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
        c2.parentid = card.parentid;
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

  const combineCards = async (parentCard, childCard) => {
    // Take a copy of the cards
    const _cards = [...cards];
    // Update the child card
    const _card = _cards.find((c) => c.cardid === childCard.cardid);
    _card.parentid = parentCard.cardid;
    // Then update on the service
    await cardsService.update(board.boardid, childCard.columnid, _card);
    // Check for other cards to be updated any already merged cards
    _cards.map(async (c) => {
      // If any cards were children of the child card then update them to be
      // children of the new parent
      if (c.parentid === childCard.cardid) {
        c.parentid = parentCard.cardid;
        await cardsService.update(board.boardid, childCard.columnid, c);
      }
    });
    // Update the state
    setCards(_cards);
  };

  const separateCards = async (parentCard, childCard) => {
    // Copies of the data we need
    const _columnid = childCard.columnid;
    const _cards = [...cards];
    const _card = _cards.find((c) => c.cardid === childCard.cardid);
    // Remove the parentid and change the column
    _card.columnid = parentCard.columnid;
    _card.parentid = null;
    // Update at the service
    await cardsService.update(board.boardid, _columnid, _card);
    // Update the state
    setCards(_cards);
  };

  return { addCard, deleteCard, updateCard, combineCards, separateCards };
};

export default useCardsController;
