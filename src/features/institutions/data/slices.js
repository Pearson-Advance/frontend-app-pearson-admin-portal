/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from 'features/shared/data/constants';

const institutionSlice = createSlice({
  name: 'institutions',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    data: [],
    filters: {
      search: '',
      active: '',
      name: '',
    },
    form: {
      isOpen: false,
      errors: {},
    },
  },
  reducers: {
    fetchInstitutionsRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchInstitutionsSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = payload;
    },
    fetchInstitutionsFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    setFilters: (state, { payload }) => {
      state.filters = {
        ...state.filters,
        search: payload.search,
        active: payload.active,
        name: payload.name,
      };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        active: '',
        name: '',
      };
    },
    institutionPostSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.data = [payload, ...state.data];
      state.form = {
        errors: {},
        isOpen: false,
      };
    },
    institutionPostFailed: (state, { payload }) => {
      state.status = RequestStatus.FAILED;
      state.form = {
        errors: payload,
        isOpen: true,
      };
    },
    openModalForm: (state) => {
      state.form.isOpen = true;
    },
    closeModalForm: (state) => {
      state.form = {
        errors: {},
        isOpen: false,
      };
    },
  },
});

export const {
  fetchInstitutionsRequest,
  fetchInstitutionsSuccess,
  fetchInstitutionsFailed,
  setFilters,
  clearFilters,
  institutionPostSuccess,
  institutionPostFailed,
  institutionPostClean,
  closeModalForm,
  openModalForm,
} = institutionSlice.actions;

export const { reducer } = institutionSlice;
