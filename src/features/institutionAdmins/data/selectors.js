import { createSelector } from '@reduxjs/toolkit';

export const selectAdmins = createSelector(
  (state) => state,
  (state) => state.admins,
);
