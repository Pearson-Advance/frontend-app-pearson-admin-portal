/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const institutionAdminSlice = createSlice({
  name: 'institutionAdmins',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    form: {
      isOpen: false,
      errors: {},
    },
  },
  reducers: {
    fetchInstitutionAdminsRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchInstitutionAdminsSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = payload;
    },
    fetchInstitutionAdminsFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    postAdminSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = [payload, ...state.data];
      state.form = {
        ...state.form,
        errors: {},
        isOpen: false,
      };
    },
    postAdminFailed: (state, { payload }) => {
      state.status = RequestStatus.FAILED;
      state.form = {
        ...state.form,
        errors: payload,
        isOpen: true,
      };
    },
    openModal: (state) => {
      state.form = {
        ...state.form,
        isOpen: true,
      };
    },
    closeModal: (state) => {
      state.form = {
        ...state.form,
        errors: {},
        isOpen: false,
      };
    },
  },
});

export const {
  fetchInstitutionAdminsRequest,
  fetchInstitutionAdminsSuccess,
  fetchInstitutionAdminsFailed,
  postAdminSuccess,
  postAdminFailed,
  openModal,
  closeModal,
} = institutionAdminSlice.actions;

export const { reducer } = institutionAdminSlice;
