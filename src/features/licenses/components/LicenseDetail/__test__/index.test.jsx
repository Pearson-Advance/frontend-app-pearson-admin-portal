/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Factory } from 'rosie';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import { LicenseDetail } from 'features/licenses/components/LicenseDetail';
import 'features/licenses/data/__factories__';
import { TabIndex } from 'features/shared/data/constants';

import { initializeStore } from 'store';
import { renderWithProvidersAndIntl } from 'test-utils';

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

    const { container } = renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(container).toHaveTextContent('Training center 1');
    });

    expect(container).toHaveTextContent('Master Course');
    expect(store.getState().page.tab).toEqual(TabIndex.LICENSES);
  });

  test('render license detail with no orders', async () => {
    const licenseDataNoOrders = { ...licenseData, licenseOrder: [] };
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseDataNoOrders);

    const { container } = renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(container).toHaveTextContent('Training center 1');
    });

    expect(container).toHaveTextContent('No orders found.');
  });

  test('render license detail with a failed request', async () => {
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(500);

    const { container } = renderWithProvidersAndIntl(<LicenseDetail />, { store });

    await waitFor(() => {
      expect(axiosMock.history.get.length).toBeGreaterThan(0);
    });

    expect(container).not.toHaveTextContent('Institution:');
    expect(container.querySelectorAll('table')).toHaveLength(0);
  });
});
