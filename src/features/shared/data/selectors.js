import { createSelector } from '@reduxjs/toolkit';

export const selectPage = createSelector(
  (state) => state,
  (state) => state.page,
);

export const institutionsSelector = state => state.institutions.data;
