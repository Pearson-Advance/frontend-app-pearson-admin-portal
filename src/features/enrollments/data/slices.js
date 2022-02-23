/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';
import _ from 'lodash';


function get(object, key, default_value) {
  var result = object[key];
  return (typeof result !== "undefined") ? result : default_value;
};

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
    deleteSuccessful: (state, { payload }) => {
      const dataCopy = _.cloneDeep(state.data);
      const obj = JSON.parse(payload);
      const deleteData = dataCopy.filter(item =>
        item.learnerEmail !== get(obj, "username", "")
      );
      state.data = deleteData;
    },
    deleteFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    unenrollSuccessful: (state, { payload }) => {
      const dataCopy = _.cloneDeep(state.data);
      const unenrollData = dataCopy.map(item => {
        if (item.learnerEmail == payload.user_email)
          item.status = payload.is_active
        return item
      });
      state.data = unenrollData
    }
  },
});

export const {
  fetchStudentEnrollmentsRequest,
  fetchStudentEnrollmentsSuccess,
  fetchStudentEnrollmentsFailed,
  deleteSuccessful,
  deleteFailed,
  unenrollSuccessful,
} = studentEnrollmentsSlice.actions;

export const { reducer } = studentEnrollmentsSlice;
