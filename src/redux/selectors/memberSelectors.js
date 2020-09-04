import { createSelector } from 'reselect';

const getMembers = (state) => state.members;
const getProfile = (state) => state.profile;

// Get all of the pending memberships for this user
export const getInvitedMemberships = () => {
  return createSelector([getMembers, getProfile], (members, profile) => {
    return members
      .filter(
        (member) =>
          member.status === 'invited' && member.email === profile.email,
      )
      .sort((a, b) => {
        if (a.memberid > b.memberid) return 1;
        return -1;
      });
  });
};
