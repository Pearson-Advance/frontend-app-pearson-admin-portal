import React from 'react';
import { render } from '@testing-library/react';
import { LicensesPage } from 'features/licenses/components/LicensesPage';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

let store;
let component;

describe('Test suite for LicensesPage component.', () => {
  beforeEach(() => {
    store = initializeStore();

    component = render(
      <Provider store={store}>
        <LicensesPage />
      </Provider>,
    );
  });

  test('render LicensesPage component', () => {
    expect(component.container.querySelectorAll('table')).toHaveLength(1);
  });
});
