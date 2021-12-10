/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TabIndex } from 'features/shared/data/constants';

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    tab: TabIndex.INSTITUTIONS,
  },
  reducers: {
    changeTab: (state, { payload }) => {
      state.tab = payload;
    },
  },
});

export const {
  changeTab,
} = pageSlice.actions;

export const { reducer } = pageSlice;
