import useVotesService from '../../../services/useVotesService';

const useVotesController = (board, votes, setVotes) => {
  const votesService = useVotesService();

  const addVote = async (vote) => {
    // Call the API
    const _newVote = await votesService.create(
      board.boardid,
      vote.cardid,
      vote,
    );
    // Add the new card to the list
    setVotes([...votes, _newVote]);
  };

  const deleteVote = async (voteid, cardid) => {
    // Call the API
    votesService.remove(board.boardid, cardid, voteid);
    // Remove the card from the list
    const _votes = votes.filter((v) => v.voteid !== voteid);
    // Save changes to state
    setVotes(_votes);
  };

  return { addVote, deleteVote };
};

export default useVotesController;
