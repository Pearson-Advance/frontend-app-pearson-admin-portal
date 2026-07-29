/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const studentEnrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: {
    updateEnrollmentStatus: {
      errorMessage: '',
    },
  },
  reducers: {
    updateEnrollment: (state, { payload }) => {
      state.updateEnrollmentStatus.errorMessage = payload.errorMessage || null;
    },
  },
});

export const {
  updateEnrollment,
} = studentEnrollmentsSlice.actions;

export const { reducer } = studentEnrollmentsSlice;
