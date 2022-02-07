/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TabIndex } from 'features/shared/data/constants';

const initialDataTableState = {
  filters: '[]',
  sortBy: [],
  pageIndex: 0,
  pageSize: 10,
};

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    tab: TabIndex.INSTITUTIONS,
    dataTable: initialDataTableState,
    globalFilters: {
      institutions: [],
      selectedInstitution: null,
    },
  },
  reducers: {
    changeTab: (state, { payload }) => {
      state.tab = payload;
      state.dataTable = initialDataTableState;
    },
    changeFilters: (state, { payload }) => {
      state.dataTable.filters = payload;
    },
    changeSortBy: (state, { payload }) => {
      state.dataTable.sortBy = payload;
    },
    changePageIndex: (state, { payload }) => {
      state.dataTable.pageIndex = payload;
    },
    changePageSize: (state, { payload }) => {
      state.dataTable.pageSize = payload;
    },
    changeGlobalFilters: (state, { payload }) => {
      state.globalFilters.selectedInstitution = payload;
    },
    fetchInstitutionsSelect: (state, { payload }) => {
      state.globalFilters.institutions = payload.reduce((filtered, institution) => {
        if (institution.active) { filtered.push({ value: institution.id, label: institution.name }); }

        return filtered;
      }, []);
    },
  },
});

export const {
  changeTab,
  changeFilters,
  changePageIndex,
  changePageSize,
  changeSortBy,
  changeGlobalFilters,
  fetchInstitutionsSelect,
} = pageSlice.actions;

export const { reducer } = pageSlice;
