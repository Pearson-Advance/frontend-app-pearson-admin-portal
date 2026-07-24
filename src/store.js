import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { reducer as pageReducer } from 'features/shared/data/slices';
import { reducer as institutionsReducer } from 'features/institutions/data';
import { reducer as institutionAdminsReducer } from 'features/institutionAdmins/data';
import { reducer as licensesReducer } from 'features/licenses/data';
import { reducer as enrollmentsReducer } from 'features/enrollments/data';
import { reducer as dataReportReducer } from 'features/dataReport/data';

import { apiSlice } from 'features/shared/data/apiSlice';

export function initializeStore(preloadedState = undefined) {
  const store = configureStore({
    reducer: {
      page: pageReducer,
      institutions: institutionsReducer,
      admins: institutionAdminsReducer,
      licenses: licensesReducer,
      enrollments: enrollmentsReducer,
      dataReport: dataReportReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  });

  setupListeners(store.dispatch);

  return store;
}

export const store = initializeStore();
