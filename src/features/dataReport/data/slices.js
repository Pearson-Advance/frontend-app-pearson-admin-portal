/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const dataReportSlice = createSlice({
  name: 'dataReport',
  initialState: {
    ccxLevelStatus: RequestStatus.IN_PROGRESS,
    mcLevelStatus: RequestStatus.IN_PROGRESS,
    ccxLevelResponse: {
      results: [],
      count: 0,
    },
    mcLevelResponse: {
      results: [],
      count: 0,
    },
    managedMasterCourses: [],
  },
  reducers: {
    fetchLicenseUsageCCXLevelRequest: (state) => {
      state.ccxLevelStatus = RequestStatus.IN_PROGRESS;
    },
    fetchLicenseUsageMCLevelRequest: (state) => {
      state.mcLevelStatus = RequestStatus.IN_PROGRESS;
    },
    fetchLicenseUsageCCXLevelSuccess: (state, { payload }) => {
      state.ccxLevelStatus = RequestStatus.SUCCESSFUL;
      state.ccxLevelResponse = payload;
    },
    fetchLicenseUsageMCLevelSuccess: (state, { payload }) => {
      state.mcLevelStatus = RequestStatus.SUCCESSFUL;
      state.mcLevelResponse = payload;
    },
    fetchLicenseUsageCCXLevelFailed: (state) => {
      state.ccxLevelStatus = RequestStatus.FAILED;
    },
    fetchLicenseUsageMCLevelFailed: (state) => {
      state.mcLevelStatus = RequestStatus.FAILED;
    },
  },
});

export const {
  fetchLicenseUsageCCXLevelRequest,
  fetchLicenseUsageMCLevelRequest,
  fetchLicenseUsageCCXLevelSuccess,
  fetchLicenseUsageMCLevelSuccess,
  fetchLicenseUsageCCXLevelFailed,
  fetchLicenseUsageMCLevelFailed,
} = dataReportSlice.actions;

export const { reducer } = dataReportSlice;
