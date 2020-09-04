import { createSelector } from 'reselect';

// This is a function for getting all actions from state
const getActions = (state) => state.actions;

// Selector for returning actions sorted by rank and then actionid
export const getSortedActions = () => {
  return createSelector([getActions], (actions) => {
    return actions.sort((a, b) => {
      if (a.rank > b.rank) return 1;
      if (a.rank === b.rank && a.actionid > b.actionid) return 1;
      return -1;
    });
  });
};

// Selector for returning actions filtered by status (and sorted)
export const getActionsForStatus = (status) => {
  return createSelector([getActions], (actions) => {
    return actions
      .filter((action) => action.status === status)
      .sort((a, b) => {
        if (a.rank > b.rank) return 1;
        if (a.rank === b.rank && a.actionid > b.actionid) return 1;
        return -1;
      });
  });
};
