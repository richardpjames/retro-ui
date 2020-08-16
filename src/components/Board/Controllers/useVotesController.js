import votesService from '../../../services/votesService';
import { useAuth0 } from '@auth0/auth0-react';

const useVotesController = (board, votes, setVotes) => {
  const { getAccessTokenSilently } = useAuth0();

  const addVote = async (vote) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Call the API
    const _newVote = await votesService.create(
      board._id,
      vote.cardId,
      vote,
      token,
    );
    // Add the new card to the list
    setVotes([...votes, _newVote]);
  };

  const deleteVote = async (voteId, cardId) => {
    // Get the access token required to call the API
    const token = await getAccessTokenSilently();
    // Call the API
    votesService.remove(board._id, cardId, voteId, token);
    // Remove the card from the list
    const _votes = votes.filter((v) => v._id !== voteId);
    // Save changes to state
    setVotes(_votes);
  };

  return { addVote, deleteVote };
};

export default useVotesController;
