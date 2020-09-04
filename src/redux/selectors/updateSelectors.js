import { createSelector } from 'reselect';

const getUpdates = (state) => state.updates;

// Selecting the updates for a particular action
export const getUpdatesForAction = (actionid) => {
  return createSelector([getUpdates], (updates) => {
    return updates
      .filter((update) => update.actionid === actionid)
      .sort((a, b) => {
        if (a.created > b.created) return 1;
        return -1;
      });
  });
};
