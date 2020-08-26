import useVotesService from '../../../services/useVotesService';

const useVotesController = (data) => {
  const votesService = useVotesService();

  const addVote = async (vote) => {
    // Call the API
    const _newVote = await votesService.create(
      data.board.boardid,
      vote.cardid,
      vote,
    );
    // Add the new card to the list
    data.setVotes([...data.votes, _newVote]);
  };

  const deleteVote = async (voteid, cardid) => {
    // Call the API
    votesService.remove(data.board.boardid, cardid, voteid);
    // Remove the card from the list
    const _votes = data.votes.filter((v) => v.voteid !== voteid);
    // Save changes to state
    data.setVotes(_votes);
  };

  return { addVote, deleteVote };
};

export default useVotesController;
