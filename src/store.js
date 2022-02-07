import { configureStore } from '@reduxjs/toolkit';

import { reducer as pageReducer } from 'features/shared/data/slices';
import { reducer as institutionsReducer } from 'features/institutions/data';
import { reducer as institutionAdminsReducer } from 'features/institutionAdmins/data';
import { reducer as LicensesReducer } from 'features/licenses/data';
import { reducer as EnrollmentsReducer } from 'features/enrollments/data';

export function initializeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {
      page: pageReducer,
      institutions: institutionsReducer,
      admins: institutionAdminsReducer,
      licenses: LicensesReducer,
      enrollments: EnrollmentsReducer,
    },
    preloadedState,
  });
}

export const store = initializeStore();
