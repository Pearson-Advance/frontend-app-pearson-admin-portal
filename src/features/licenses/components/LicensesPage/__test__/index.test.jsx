import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { LicensesPage } from 'features/licenses/components/LicensesPage';
import { renderWithProvidersAndIntl } from 'test-utils';

let component;

describe('Test suite for LicensesPage component.', () => {
  beforeEach(() => {
    component = renderWithProvidersAndIntl(
      <MemoryRouter>
        <LicensesPage />
      </MemoryRouter>,
    );
  });

  test('render LicensesPage component', () => {
    expect(component.container.querySelectorAll('table')).toHaveLength(1);
  });
});
