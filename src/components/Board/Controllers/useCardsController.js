import { LexoRank } from 'lexorank';
import useCardsService from '../../../services/useCardsService';
import useVotesService from '../../../services/useVotesService';

const useCardsController = (data) => {
  const cardsService = useCardsService();
  const votesService = useVotesService();

  const addCard = async (card) => {
    // Get the column from the card and then remove
    const columnid = card.columnid;
    // Set the rank based on the highest in the column
    const columnCards = data.cards.filter((c) => c.columnid === columnid);
    if (columnCards.length > 0) {
      const highestRank = columnCards[columnCards.length - 1].rank;
      const highestLexoRank = LexoRank.parse(highestRank);
      card.rank = highestLexoRank.genNext().toString();
    } else {
      card.rank = LexoRank.middle().toString();
    }
    // Call the API
    const _newCard = await cardsService.create(
      data.board.boardid,
      card.columnid,
      card,
    );
    // Add the new card to the list
    data.setCards([...data.cards, _newCard]);
  };

  const deleteCard = async (card) => {
    // Call the API
    cardsService.remove(data.board.boardid, card.columnid, card.cardid);
    // Remove the card from the list (and any children)
    const _cards = data.cards.filter(
      (c) => c.cardid !== card.cardid && c.parentid !== card.cardid,
    );
    // Save changes to state
    data.setCards(_cards);
  };

  const updateCard = async (card) => {
    // Call the api
    cardsService.update(data.board.boardid, card.columnid, card);
    // Take a copy of the cards state
    let _cards = [...data.cards];
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
    data.setCards(_cards);
  };

  const combineCards = async (parentCard, childCard) => {
    // Take a copy of the cards
    const _cards = [...data.cards];
    // Update the child card
    const _card = _cards.find((c) => c.cardid === childCard.cardid);
    _card.parentid = parentCard.cardid;
    _card.columnid = parentCard.columnid;
    // Then update on the service
    await cardsService.update(data.board.boardid, childCard.columnid, _card);
    // Remove any votes for the child card
    let _votes = [...data.votes];
    _votes.map(async (v) => {
      if (v.cardid === childCard.cardid) {
        await votesService.remove(
          data.board.boardid,
          childCard.cardid,
          v.voteid,
        );
      }
    });
    // Filter out the votes
    _votes = _votes.filter((v) => v.cardid !== childCard.cardid);
    // Check for other cards to be updated any already merged cards
    _cards.map(async (c) => {
      // If any cards were children of the child card then update them to be
      // children of the new parent
      if (c.parentid === childCard.cardid) {
        c.parentid = parentCard.cardid;
        await cardsService.update(data.board.boardid, childCard.columnid, c);
      }
    });
    // Update the state
    data.setCards(_cards);
    data.setVotes(_votes);
  };

  const separateCards = async (parentCard, childCard) => {
    // Copies of the data we need
    const _columnid = childCard.columnid;
    const _cards = [...data.cards];
    const _card = _cards.find((c) => c.cardid === childCard.cardid);
    // Remove the parentid and change the column
    _card.columnid = parentCard.columnid;
    _card.parentid = null;
    // Update at the service
    await cardsService.update(data.board.boardid, _columnid, _card);
    // Update the state
    data.setCards(_cards);
  };

  return { addCard, deleteCard, updateCard, combineCards, separateCards };
};

export default useCardsController;
