/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const institutionSlice = createSlice({
  name: 'institutions',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    filters: {
      search: '',
      active: '',
      name: '',
    },
  },
  reducers: {
    fetchInstitutionsRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchInstitutionsSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = payload;
    },
    fetchInstitutionsFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    setFilters: (state, { payload }) => {
      state.filters = {
        ...state.filters,
        search: payload.search,
        active: payload.active,
        name: payload.name,
      };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        active: '',
        name: '',
      };
    },
  },
});

export const {
  fetchInstitutionsRequest,
  fetchInstitutionsSuccess,
  fetchInstitutionsFailed,
  setFilters,
  clearFilters,
} = institutionSlice.actions;

export const { reducer } = institutionSlice;
