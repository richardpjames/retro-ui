import useBoardsService from '../../../services/useBoardsService';
import useTeamsService from '../../../services/useTeamsService';
import useCardsService from '../../../services/useCardsService';
import useUsersService from '../../../services/useUsersService';
import useColumnsService from '../../../services/columnsService';
import useVotesService from '../../../services/useVotesService';
import useActionsService from '../../../services/useActionsService';

const useFetchData = (props, data) => {
  const boardsService = useBoardsService();
  const teamsService = useTeamsService();
  const cardsService = useCardsService();
  const usersService = useUsersService();
  const columnsService = useColumnsService();
  const votesService = useVotesService();
  const actionsService = useActionsService();

  const fetchData = async (showLoadingBar = false) => {
    try {
      data.setLoading(showLoadingBar);
      // Call the API
      let _board = await boardsService.getById(props.match.params.boardid);
      let _boardUsers = await boardsService.getUsers(
        props.match.params.boardid,
      );
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
        if (a.rank === b.rank && a.cardid > b.cardid) return 1;
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
        data.setTeams(_teams);
      } // Update the user profile
      data.setProfile(_profile);
      // Update the boards
      data.setBoard(_board);
      // Set the boards users (those who have viewed)
      data.setBoardUsers(_boardUsers);
      // Determine whether to show instructions
      data.setShowinstructions(_board.showinstructions);
      // Update the columns
      data.setColumns(_columns);
      // Update the cards
      data.setCards(_cards);
      // Update the votes
      data.setVotes(_votes);
      // Update the actions
      data.setActions(_actions);
      // Stop loading bar
      data.setLoading(false);
    } catch (error) {
      // For now just log any errors - TODO: Improve error handling
      data.setLoading(false);
    }
  };

  return { fetchData };
};

export default useFetchData;
