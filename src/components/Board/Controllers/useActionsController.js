import useActionsService from '../../../services/useActionsService';

const useActionsController = (board, actions, setActions) => {
  const actionsService = useActionsService();

  const addAction = async (action) => {
    // Get the required access token
    const _newAction = await actionsService.create(action, board.boardid);
    let _actions = [...actions];
    _actions.push(_newAction);
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
    setActions(_actions);
  };

  const deleteAction = async (action) => {
    // Remove the column from the service
    actionsService.remove(board.boardid, action.actionid);
    // Remove the column from the list
    const _actions = actions.filter((a) => a.actionid !== action.actionid);
    setActions(_actions);
  };

  return { addAction, deleteAction };
};

export default useActionsController;
