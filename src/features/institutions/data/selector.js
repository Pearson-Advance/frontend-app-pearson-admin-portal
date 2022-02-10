import { createSelector } from '@reduxjs/toolkit';

export const activeInstitutions = createSelector(
  (state) => state.institutions.data,
  (data) => data.filter(institution => institution.active),
);

export const allInstitutionsForSelect = createSelector(
  (state) => state.institutions.data,
  (institutions) => institutions.map((institution) => ({ value: institution.id, label: institution.name })),
);
