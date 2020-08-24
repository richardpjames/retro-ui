import actionsService from '../../../services/actionsService';
import boardsService from '../../../services/boardsService';
import cardsService from '../../../services/cardsService';
import columnsService from '../../../services/columnsService';
import usersService from '../../../services/usersService';
import votesService from '../../../services/votesService';
import teamsService from '../../../services/teamsService';

import { useHistory } from 'react-router-dom';

const useFetchData = (
  props,
  setLoading,
  setActions,
  setBoard,
  setCards,
  setColumns,
  setProfile,
  setVotes,
  setTeams,
  showinstructions,
) => {
  const history = useHistory();

  const fetchData = async (showLoadingBar = false) => {
    try {
      setLoading(showLoadingBar);
      // Get the access token required to call the API
      // Call the API
      let _board = await boardsService.getById(props.match.params.boardid);
      let _columns = await columnsService.getAll(props.match.params.boardid);
      // Sort the columns
      _columns = _columns.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Get the required cards
      let _cards = await cardsService.getAll(props.match.params.boardid);
      // Sort them into order
      _cards = _cards.sort((a, b) => {
        if (a.rank > b.rank) return 1;
        return -1;
      });
      // Get the required votes (no need to sort etc. for these)
      let _votes = await votesService.getAll(props.match.params.boardid);
      // Get the required actions
      let _actions = await actionsService.getAll(props.match.params.boardid);
      // Sort them into order
      _actions = _actions.sort((a, b) => {
        if (a.due > b.due) {
          return 1;
        } else if (a.due === b.due) {
          if (a.actionid > b.actionid) {
            return 1;
          }
          return -1;
        }
        return -1;
      });
      // Get the user profile
      const _profile = await usersService.getProfile();
      // Get any teams
      const teams = await teamsService.getAll();
      // Update the teams
      if (teams) {
        // Sort the teams
        const _teams = teams.sort((a, b) => {
          if (a.name > b.name) return 1;
          return -1;
        });
        setTeams(_teams);
      } // Update the user profile
      setProfile(_profile);
      // Update the boards
      setBoard(_board);
      showinstructions(_board.showinstructions);
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
      setLoading(false);
      history.push(`/error/${error}`);
    }
  };

  return { fetchData };
};

export default useFetchData;
