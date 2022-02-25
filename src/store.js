import { configureStore } from '@reduxjs/toolkit';

import { reducer as pageReducer } from 'features/shared/data/slices';
import { reducer as institutionsReducer } from 'features/institutions/data';
import { reducer as institutionAdminsReducer } from 'features/institutionAdmins/data';
import { reducer as licensesReducer } from 'features/licenses/data';
import { reducer as enrollmentsReducer } from 'features/enrollments/data';
import { reducer as dataReportReducer } from 'features/dataReport/data';

export function initializeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {
      page: pageReducer,
      institutions: institutionsReducer,
      admins: institutionAdminsReducer,
      licenses: licensesReducer,
      enrollments: enrollmentsReducer,
      dataReport: dataReportReducer,
    },
    preloadedState,
  });
}

export const store = initializeStore();
