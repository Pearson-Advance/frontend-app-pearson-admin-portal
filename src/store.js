import { configureStore } from '@reduxjs/toolkit';

import { reducer as institutionsReducer } from 'features/institutions/data';

export function initializeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {
      institutions: institutionsReducer,
    },
    preloadedState,
  });
}

export const store = initializeStore();
