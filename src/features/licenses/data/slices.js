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
    form: {
      isOpen: false,
      errors: {},
      managedCourses: [],
    },
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
    postLicenseSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = [payload, ...state.data];
      state.form = {
        ...state.form,
        errors: {},
        isOpen: false,
      };
    },
    postLicenseFailed: (state, { payload }) => {
      state.status = RequestStatus.FAILED;
      state.form = {
        ...state.form,
        errors: payload,
        isOpen: true,
      };
    },
    fetchLicenseManageCoursesRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchLicenseManageCoursesSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.form.managedCourses = payload.map(course => ({ value: course.id, label: course.id }));
    },
    fetchLicenseManageCoursesFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    openLicenseModal: (state) => {
      state.form = {
        ...state.form,
        isOpen: true,
      };
    },
    closeLicenseModal: (state) => {
      state.form = {
        ...state.form,
        isOpen: false,
        errors: {},
      };
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
  postLicenseSuccess,
  postLicenseFailed,
  fetchLicenseManageCoursesRequest,
  fetchLicenseManageCoursesSuccess,
  fetchLicenseManageCoursesFailed,
  openLicenseModal,
  closeLicenseModal,
} = licenseSlice.actions;

export const { reducer } = licenseSlice;
