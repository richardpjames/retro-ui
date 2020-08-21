import votesService from '../../../services/votesService';

const useVotesController = (board, votes, setVotes) => {
  const addVote = async (vote) => {
    // Call the API
    const _newVote = await votesService.create(board._id, vote.cardId, vote);
    // Add the new card to the list
    setVotes([...votes, _newVote]);
  };

  const deleteVote = async (voteId, cardId) => {
    // Call the API
    votesService.remove(board._id, cardId, voteId);
    // Remove the card from the list
    const _votes = votes.filter((v) => v._id !== voteId);
    // Save changes to state
    setVotes(_votes);
  };

  return { addVote, deleteVote };
};

export default useVotesController;
