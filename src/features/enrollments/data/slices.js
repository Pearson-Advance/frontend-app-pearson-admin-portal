/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';
import _ from 'lodash';

const studentEnrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    filtersForm: {
      institutions: null,
      managedMasterCourses: null,
    },
  },
  reducers: {
    fetchStudentEnrollmentsRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchStudentEnrollmentsSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = payload.results;
    },
    fetchStudentEnrollmentsFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    Unenroll_Success: (state) => {
      const newData = dataCopy.map(item => {
        if (item.id == action.data.enrollment_id)
          item.is_active = action.data.is_active
        return item
      })
      state.data = newData
    },
    Unenroll_Failure: (state) => {
      state.status = RequestStatus.FAILED;
    },
  },
});

export const {
  fetchStudentEnrollmentsRequest,
  fetchStudentEnrollmentsSuccess,
  fetchStudentEnrollmentsFailed,
  Unenroll_Success,
  Unenroll_Failure,
} = studentEnrollmentsSlice.actions;

export const { reducer } = studentEnrollmentsSlice;
