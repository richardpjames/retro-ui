import actionsService from '../../../services/actionsService';
import { useAuth0 } from '@auth0/auth0-react';

const useActionsController = (board, actions, setActions) => {
  const { getAccessTokenSilently } = useAuth0();

  const addAction = async (action) => {
    // Get the required access token
    const token = await getAccessTokenSilently();
    const _newAction = await actionsService.create(action, board._id, token);
    let _actions = [...actions];
    _actions.push(_newAction);
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
    setActions(_actions);
  };

  const deleteAction = async (action) => {
    const token = await getAccessTokenSilently();
    // Remove the column from the service
    actionsService.remove(board._id, action._id, token);
    // Remove the column from the list
    const _actions = actions.filter((a) => a._id !== action._id);
    setActions(_actions);
  };

  return { addAction, deleteAction };
};

export default useActionsController;
