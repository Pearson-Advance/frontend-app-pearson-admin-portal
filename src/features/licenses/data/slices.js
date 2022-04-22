/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const licenseSlice = createSlice({
  name: 'licenses',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    ordersData: [],
    eligibleCourses: [],
    licenseById: null,
    pageSize: 10,
    pageIndex: 0,
    form: {
      isOpen: false,
      errors: {},
      order: {},
    },
    Orderform: {
      isOpen: false,
      errors: {},
      order: {},
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
    fetchEligibleCoursesRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchEligibleCoursesSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.eligibleCourses = payload.map(course => ({ value: course.id, label: `${course.id} - ${course.displayName}` }));
    },
    fetchEligibleCoursesFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    openLicenseModal: (state, { payload }) => {
      state.form = {
        ...state.form,
        isOpen: true,
        order: payload,
      };
    },
    closeLicenseModal: (state) => {
      state.form = {
        ...state.form,
        isOpen: false,
        errors: {},
      };
    },
    openLicenseOrderModal: (state, { payload }) => {
      state.Orderform = {
        ...state.Orderform,
        isOpen: true,
        order: payload,
      };
    },
    closeLicenseOrderModal: (state) => {
      state.Orderform = {
        ...state.Orderform,
        isOpen: false,
        errors: {},
      };
    },
    postLicenseOrderSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.ordersData = [payload, ...state.ordersData];
      state.Orderform = {
        ...state.Orderform,
        errors: {},
        isOpen: false,
      };
    },
    postLicenseOrderFailed: (state, { payload }) => {
      state.status = RequestStatus.FAILED;
      state.Orderform = {
        ...state.Orderform,
        errors: payload,
        isOpen: true,
      };
    },
    patchLicenseOrderSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.ordersData = [payload, ...state.ordersData];
      state.Orderform = {
        ...state.Orderform,
        errors: {},
        isOpen: false,
      };
    },
    patchLicenseOrderFailed: (state, { payload }) => {
      state.status = RequestStatus.FAILED;
      state.Orderform = {
        ...state.Orderform,
        errors: payload,
        isOpen: true,
      };
    },
    clearLicenseOrder: (state) => {
      if (state.licenseById && state.licenseById.licenseOrder) {
        state.licenseById.licenseOrder = [];
      }
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
  fetchEligibleCoursesRequest,
  fetchEligibleCoursesSuccess,
  fetchEligibleCoursesFailed,
  openLicenseModal,
  closeLicenseModal,
  openLicenseOrderModal,
  closeLicenseOrderModal,
  postLicenseOrderSuccess,
  postLicenseOrderFailed,
  patchLicenseOrderSuccess,
  patchLicenseOrderFailed,
  clearLicenseOrder,
} = licenseSlice.actions;

export const { reducer } = licenseSlice;
