import { createSelector } from '@reduxjs/toolkit';

export const activeInstitutions = createSelector(
  (state) => state.institutions.data,
  (data) => data.filter(institution => institution.active),
);
