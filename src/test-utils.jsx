import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { initializeStore } from 'store';

export const executeThunk = async (thunk, dispatch, getState) => {
  await thunk(dispatch, getState);
};

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = initializeStore(preloadedState),
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/**
 * Same as renderWithProviders, but includes IntlProvider for components that rely on react-intl
 * (e.g., Paragon DataTable pagination, FormattedMessage).
 *
 * We keep renderWithProviders unchanged to avoid impacting tests that don't require i18n.
 */
export function renderWithProvidersAndIntl(
  ui,
  {
    preloadedState = {},
    store = initializeStore(preloadedState),
    locale = 'en',
    messages = {},
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => (
    <IntlProvider locale={locale} messages={messages}>
      <Provider store={store}>{children}</Provider>
    </IntlProvider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
