import React from 'react';
import { Factory } from 'rosie';
import { render } from '@testing-library/react';
import { LicenseDetail } from 'features/licenses/components/LicenseDetail';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import 'features/licenses/data/__factories__';

import MockAdapter from 'axios-mock-adapter';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { executeThunk } from 'test-utils';
import { fetchLicensebyId } from 'features/licenses/data/thunks';
import { TabIndex } from 'features/shared/data/constants';

const licensesApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
let axiosMock = null;
let store;
const licenseData = {
  institution: {
    name: 'Training center 1',
  },
  course: {
    displayName: 'Master Course',
  },
  purchasedSeats: 100,
  courseAccessDuration: 180,
  status: 'active',
  licenseOrder: Factory.buildList('licenseOrder', 2),
};

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: 1,
  }),
}));

describe('Test suite for license detail component.', () => {
  beforeEach(() => {
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

  test('render license detail component', async () => {
    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseData);
    await executeThunk(fetchLicensebyId(1), store.dispatch, store.getState);

    const { container } = render(
      <Provider store={store}>
        <LicenseDetail />
      </Provider>,
    );
    const tableRows = container.querySelectorAll('tr');

    expect(container).toHaveTextContent('Training center 1');
    expect(tableRows).toHaveLength(1);
    expect(store.getState().page.tab).toEqual(TabIndex.LICENSES);
  });

  test('render license detail with no orders', async () => {
    licenseData.licenseOrder = [];

    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, licenseData);
    await executeThunk(fetchLicensebyId(1), store.dispatch, store.getState);

    const { container } = render(
      <Provider store={store}>
        <LicenseDetail />
      </Provider>,
    );

    expect(container).toHaveTextContent('No orders found.');
  });

  test('render license detail with a failed request', async () => {
    licenseData.licenseOrder = [];

    axiosMock.onGet(`${licensesApiUrl}1/`).reply(500);
    await executeThunk(fetchLicensebyId(1), store.dispatch, store.getState);

    const { container } = render(
      <Provider store={store}>
        <LicenseDetail />
      </Provider>,
    );
    const table = container.querySelectorAll('table');

    expect(container).not.toHaveTextContent('Institution:');
    expect(table).toHaveLength(0);
  });
});
