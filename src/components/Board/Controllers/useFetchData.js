import actionsService from '../../../services/actionsService';
import boardsService from '../../../services/boardsService';
import cardsService from '../../../services/cardsService';
import columnsService from '../../../services/columnsService';
import usersService from '../../../services/usersService';
import votesService from '../../../services/votesService';

import { useAuth0 } from '@auth0/auth0-react';

const useFetchData = (
  props,
  setLoading,
  setActions,
  setBoard,
  setCards,
  setColumns,
  setProfile,
  setVotes,
) => {
  const { getAccessTokenSilently, user } = useAuth0();

  const fetchData = async (showLoadingBar = false) => {
    try {
      setLoading(showLoadingBar);
      // Get the access token required to call the API
      const token = await getAccessTokenSilently();
      // Call the API
      let _board = await boardsService.getById(
        props.match.params.boardId,
        token,
      );
      let _columns = await columnsService.getAll(
        props.match.params.boardId,
        token,
      );
      // Sort the columns
      _columns = _columns.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Get the required cards
      let _cards = await cardsService.getAll(props.match.params.boardId, token);
      // Sort them into order
      _cards = _cards.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Get the required votes (no need to sort etc. for these)
      let _votes = await votesService.getAll(props.match.params.boardId, token);
      // Get the required actions
      let _actions = await actionsService.getAll(
        props.match.params.boardId,
        token,
      );
      // Sort them into order
      _actions = _actions.sort((a, b) => {
        if (a.due > b.due) {
          return 1;
        } else if (a.due === b.due) {
          if (a._id > b._id) {
            return 1;
          }
          return -1;
        }
        return -1;
      });
      // Get the user profile
      const profile = await usersService.getById(user.sub, token);
      setProfile(profile);
      // Update the boards
      setBoard(_board);
      // Update the columns
      setColumns(_columns);
      // Update the cards
      setCards(_cards);
      // Update the votes
      setVotes(_votes);
      // Update the actions
      setActions(_actions);
      // Stop loading bar
      setLoading(false);
    } catch (error) {
      // For now just log any errors - TODO: Improve error handling
      console.log(error);
    }
  };

  return { fetchData };
};

export default useFetchData;
