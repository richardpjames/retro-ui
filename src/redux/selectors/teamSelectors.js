import { createSelector } from 'reselect';

// Get the users profile
const getProfile = (state) => state.profile;

// This is a function for getting all teams from state
const getTeams = (state) => state.teams;

// Selector for returning actions sorted by rank and then actionid
export const getSortedTeams = () => {
  return createSelector([getTeams], (teams) => {
    return teams.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name === b.name && a.teamid > b.teamid) return 1;
      return -1;
    });
  });
};

// Select teams belonging to the current user
export const getTeamsForUser = () => {
  return createSelector([getTeams, getProfile], (teams, profile) => {
    return teams
      .filter((team) => team.userid === profile.userid)
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name === b.name && a.teamid > b.teamid) return 1;
        return -1;
      });
  });
};
