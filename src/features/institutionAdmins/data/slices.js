/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const institutionAdminSlice = createSlice({
  name: 'institutionAdmins',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
  },
  reducers: {
    fetchInstitutionAdminsRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchInstitutionAdminsSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = payload;
    },
    fetchInstitutionAdminsFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
  },
});

export const {
  fetchInstitutionAdminsRequest,
  fetchInstitutionAdminsSuccess,
  fetchInstitutionAdminsFailed,
} = institutionAdminSlice.actions;

export const { reducer } = institutionAdminSlice;
