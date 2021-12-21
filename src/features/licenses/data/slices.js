/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const licenseSlice = createSlice({
  name: 'licenses',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    count: 0,
    pageSize: 2,
    pageNumber: 1,
    numPages: 0,
    filters: {},
    sortBy: null,
  },
  reducers: {
    fetchLicensesRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchLicensesSuccess: (state, { payload }) => {
      console.log('payload')
      console.log(payload)
      state.status = RequestStatus.SUCCESSFUL;
      state.data = payload.results;
      state.count = payload.count;
      state.numPages = payload.numPages;
      state.pageNumber = payload.currentPage;
    },
    fetchLicensesFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    changePageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    changePageSize: (state, { payload }) => {
      state.pageSize = payload;
      state.pageNumber = 1;
    },
  },
});

export const {
  fetchLicensesRequest,
  fetchLicensesSuccess,
  fetchLicensesFailed,
  changePageNumber,
  changePageSize,
} = licenseSlice.actions;

export const { reducer } = licenseSlice;