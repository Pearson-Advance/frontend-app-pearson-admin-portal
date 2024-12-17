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
      license: {},
    },
    Orderform: {
      isOpen: false,
      errors: {},
      order: {},
    },
    catalogs: {
      data: [],
      status: RequestStatus.INITIAL,
      errors: {},
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
      state.eligibleCourses = payload.map(course => ({ value: course.id, label: `${course.displayName} - ${course.id}` }));
    },
    fetchEligibleCoursesFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    openLicenseModal: (state, { payload }) => {
      if (payload) {
        // When there is a payload, it opens the Edit modal.
        state.form = {
          ...state.form,
          license: payload,
          isOpen: true,
        };
      } else {
        state.form = {
          ...state.form,
          isOpen: true,
          license: {},
        };
      }
    },
    patchLicenseSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = state.data.map(
        (content) => (content.id === payload.id ? payload : content),
      );
      state.form = {
        ...state.form,
        errors: {},
        isOpen: false,
      };
    },
    patchLicenseFailed: (state, { payload }) => {
      state.status = RequestStatus.FAILED;
      state.form = {
        ...state.form,
        errors: payload,
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
    updateCatalogs: (state, { payload }) => {
      state.catalogs.data = payload.map(catalog => ({ value: catalog.id, label: catalog.name }));
    },
    updateCatalogsRequestStatus: (state, { payload }) => {
      state.catalogs.status = payload;
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
  patchLicenseSuccess,
  patchLicenseFailed,
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
  updateCatalogs,
  updateCatalogsRequestStatus,
} = licenseSlice.actions;

export const { reducer } = licenseSlice;
