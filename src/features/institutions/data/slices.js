/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const institutionSlice = createSlice({
  name: 'institutions',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
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
    fetchInstitutionsDenied: (state) => {
      state.status = RequestStatus.DENIED;
    },
  },
});

export const {
  fetchInstitutionsRequest,
  fetchInstitutionsSuccess,
  fetchInstitutionsFailed,
  fetchInstitutionsDenied,
} = institutionSlice.actions;

export const { reducer } = institutionSlice;
