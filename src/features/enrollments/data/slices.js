/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const studentEnrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    requestResponse: {
      results: [],
      count: 0,
      numPages: 0,
    },
    filtersForm: {
      institutions: null,
      managedMasterCourses: null,
    },
    updateEnrollmentStatus: {
      errorMessage: '',
    },
  },
  reducers: {
    fetchStudentEnrollmentsRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchStudentEnrollmentsSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.requestResponse = payload;
    },
    fetchStudentEnrollmentsFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    updateEnrollment: (state, { payload }) => {
      state.updateEnrollmentStatus.errorMessage = payload.errorMessage || null;
    },
  },
});

export const {
  fetchStudentEnrollmentsRequest,
  fetchStudentEnrollmentsSuccess,
  fetchStudentEnrollmentsFailed,
  updateEnrollment,
} = studentEnrollmentsSlice.actions;

export const { reducer } = studentEnrollmentsSlice;
