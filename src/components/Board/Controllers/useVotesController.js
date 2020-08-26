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
    // Update the remaining votes
    data.setVotesRemaining(data.votesRemaining - 1);
    // Add the new card to the list
    data.setVotes([...data.votes, _newVote]);
  };

  const deleteVote = async (voteid, cardid) => {
    console.log('filtering');
    // Remove the card from the list
    let _votes = [...data.votes];
    _votes = _votes.filter((v) => v.voteid !== voteid);
    // Update the remaining votes
    data.setVotesRemaining(data.votesRemaining + 1);
    // Save changes to state
    data.setVotes(_votes);
    // Call the API
    votesService.remove(data.board.boardid, cardid, voteid);
  };

  return { addVote, deleteVote };
};

export default useVotesController;
