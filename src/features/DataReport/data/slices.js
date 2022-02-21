/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const dataReportSlice = createSlice({
  name: 'dataReport',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    ccxLevel: {
      results: [],
      count: 0,
    },
    mcLevelData: {
      results: [],
      count: 0,
    },
    managedMasterCourses: [],
  },
  reducers: {
    fetchLicenseUsageRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchLicenseUsageCCXLevelSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.ccxLevel = payload;
    },
    fetchLicenseUsageMCLevelSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.mcLevelData = payload;
    },
    fetchLicenseUsageFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
  },
});

export const {
  fetchLicenseUsageRequest,
  fetchLicenseUsageCCXLevelSuccess,
  fetchLicenseUsageMCLevelSuccess,
  fetchLicenseUsageFailed,
} = dataReportSlice.actions;

export const { reducer } = dataReportSlice;
