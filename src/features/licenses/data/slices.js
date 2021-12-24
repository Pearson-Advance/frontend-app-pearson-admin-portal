/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const licenseSlice = createSlice({
  name: 'licenses',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    pageSize: 10,
    pageIndex: 0,
  },
  reducers: {
    fetchLicensesRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchLicensesSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = payload;
    },
    fetchLicensesFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
  },
});

export const {
  fetchLicensesRequest,
  fetchLicensesSuccess,
  fetchLicensesFailed,
} = licenseSlice.actions;

export const { reducer } = licenseSlice;