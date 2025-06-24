import type { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

const selectUsersState = (state: RootState) => state.users;

export const selectFilteredUsers = createSelector(
  [selectUsersState],
  (usersState) => {
    const searchTerm = usersState.search.toLowerCase();
    return usersState.users.filter((u) =>
      u.name.toLowerCase().includes(searchTerm)
    );
  }
);
