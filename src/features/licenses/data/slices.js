/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const licenseSlice = createSlice({
  name: 'licenses',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    licenseById: null,
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
    fetchLicenseRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
      state.licenseById = null;
    },
    fetchLicenseSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.licenseById = payload;
    },
    fetchLicenseFailed: (state) => {
      state.status = RequestStatus.FAILED;
      state.licenseById = null;
    },
  },
});

export const {
  fetchLicensesRequest,
  fetchLicensesSuccess,
  fetchLicensesFailed,
  fetchLicenseRequest,
  fetchLicenseSuccess,
  fetchLicenseFailed,
} = licenseSlice.actions;

export const { reducer } = licenseSlice;
