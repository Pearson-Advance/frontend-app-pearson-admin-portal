/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Factory } from 'rosie';

import { LicenseTable } from 'features/licenses/components/LicenseTable';
import 'features/licenses/data/__factories__';
import { RequestStatus } from 'features/shared/data/constants';

import { initializeStore } from 'store';
import { renderWithProvidersAndIntl } from 'test-utils';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Unit tests for Licenses data table.', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('render LicensesTable with no data', () => {
    const store = initializeStore();

    const component = renderWithProvidersAndIntl(<LicenseTable />, {
      store,
    });

    expect(component.container).toHaveTextContent('No results found');
  });

  test('render LicensesTable with data', () => {
    const data = Factory.build('licenseList');

    const store = initializeStore({
      licenses: {
        status: RequestStatus.IN_PROGRESS,
        data,
        pageSize: 10,
        pageIndex: 0,
        catalogs: { data: [] },
      },
    });

    const component = renderWithProvidersAndIntl(<LicenseTable data={data} />, {
      store,
    });

    const tableRows = component.container.querySelectorAll('tr');

    expect(component.container).toHaveTextContent('course-v1:PX+01+2021');
    expect(component.container).toHaveTextContent('course-v1:PX+02+2021');
    expect(component.container).not.toHaveTextContent('No results found');
    expect(tableRows).toHaveLength(3);
  });

  test('render LicensesTable with catalog', () => {
    const license = Factory.build('license', {
      licenseType: 'catalog',
      catalogs: ['catalog1'],
    });

    const store = initializeStore({
      licenses: {
        status: RequestStatus.IN_PROGRESS,
        data: [license],
        pageSize: 10,
        pageIndex: 0,
        catalogs: {
          data: [{ value: 'catalog1', label: 'demo catalog' }],
        },
      },
    });

    const component = renderWithProvidersAndIntl(<LicenseTable data={[license]} />, {
      store,
    });

    expect(component.container).toHaveTextContent('demo catalog');
  });
});
