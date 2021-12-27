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
  },
});

export const {
  changeTab,
  changeFilters,
  changePageIndex,
  changePageSize,
  changeSortBy,
} = pageSlice.actions;

export const { reducer } = pageSlice;
