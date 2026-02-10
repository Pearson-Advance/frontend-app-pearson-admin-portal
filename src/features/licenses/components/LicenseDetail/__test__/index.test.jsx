/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Factory } from 'rosie';
import MockAdapter from 'axios-mock-adapter';

import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { LicenseDetail } from 'features/licenses/components/LicenseDetail';
import 'features/licenses/data/__factories__';
import { fetchLicensebyId } from 'features/licenses/data/thunks';
import { TabIndex } from 'features/shared/data/constants';

import { initializeStore } from 'store';
import { executeThunk, renderWithProviders } from 'test-utils';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: 1 }),
}));

const licensesApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;

const licenseData = {
  institution: { name: 'Training center 1' },
  courses: [{ displayName: 'Master Course' }],
  purchasedSeats: 100,
  courseAccessDuration: 180,
  status: 'active',
  licenseOrder: Factory.buildList('licenseOrder', 2),
};

describe('Test suite for license detail component.', () => {
  let axiosMock;
  let store;

  beforeEach(() => {
    mockNavigate.mockClear();

    initializeMockApp({
      authenticatedUser: {
        userId: 1,
        username: 'testuser',
        administrator: true,
        roles: [],
      },
    });

    axiosMock = new MockAdapter(getAuthenticatedHttpClient());
    store = initializeStore();
  });

  afterEach(() => {
    axiosMock?.restore();
  });

  test('render license detail component', async () => {
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseData);
    await executeThunk(fetchLicensebyId(1), store.dispatch, store.getState);

    const { container } = renderWithProviders(<LicenseDetail />, {
      store,
      route: '/licenses/1',
    });

    const tableRows = container.querySelectorAll('tr');

    expect(container).toHaveTextContent('Training center 1');
    expect(tableRows).toHaveLength(1);
    expect(store.getState().page.tab).toEqual(TabIndex.LICENSES);
  });

  test('render license detail with no orders', async () => {
    const licenseDataNoOrders = { ...licenseData, licenseOrder: [] };

    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseDataNoOrders);
    await executeThunk(fetchLicensebyId(1), store.dispatch, store.getState);

    const { container } = renderWithProviders(<LicenseDetail />, {
      store,
      route: '/licenses/1',
    });

    expect(container).toHaveTextContent('No orders found.');
  });

  test('render license detail with a failed request', async () => {
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(500);
    await executeThunk(fetchLicensebyId(1), store.dispatch, store.getState);

    const { container } = renderWithProviders(<LicenseDetail />, {
      store,
      route: '/licenses/1',
    });

    const table = container.querySelectorAll('table');

    expect(container).not.toHaveTextContent('Institution:');
    expect(table).toHaveLength(0);
  });
});
