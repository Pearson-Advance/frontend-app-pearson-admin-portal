/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TabIndex, MAX_TABLE_RECORDS } from 'features/shared/data/constants';

const initialDataTableState = {
  filters: '[]',
  sortBy: [],
  pageIndex: 0,
  pageSize: MAX_TABLE_RECORDS,
};

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    tab: TabIndex.INSTITUTIONS,
    dataTable: initialDataTableState,
    globalFilters: {
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
  },
});

export const {
  changeTab,
  changeFilters,
  changePageIndex,
  changePageSize,
  changeSortBy,
  changeGlobalFilters,
} = pageSlice.actions;

export const { reducer } = pageSlice;
