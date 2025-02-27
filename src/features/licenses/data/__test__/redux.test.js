import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { executeThunk } from 'test-utils';
import { initializeStore } from 'store';

import 'features/licenses/data/__factories__';
import { fetchLicenses, fetchCatalogs } from '../thunks';

const licensesApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
let axiosMock;
let store;

describe('Licenses data layer tests', () => {
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

    Factory.resetAll();
    store = initializeStore();
  });

  test('successful licenses retrieval', async () => {
    axiosMock.onGet(licensesApiUrl)
      .reply(200, Factory.build('licenseList'));

    expect(store.getState().licenses.status)
      .toEqual('in-progress');

    await executeThunk(fetchLicenses(), store.dispatch, store.getState);

    expect(store.getState().licenses.data)
      .toEqual([{
        courses: [
          {
            displayName: 'TC1',
            id: 'course-v1:PX+01+2021',
          },
        ],
        courseAccessDuration: 10,
        id: 1,
        institution: {
          id: '1',
          name: 'Training Center 1',
          shortName: 'TC1',
        },
        purchasedSeats: 1,
        status: 'active',
        licenseOrder: [],
        licenseType: 'courses',
      },
      {
        courses: [
          {
            displayName: 'TC2',
            id: 'course-v1:PX+02+2021',
          },
        ],
        courseAccessDuration: 20,
        id: 2,
        institution: {
          id: '2',
          name: 'Training Center 2',
          shortName: 'TC2',
        },
        purchasedSeats: 2,
        status: 'active',
        licenseOrder: [],
        licenseType: 'courses',
      }]);

    expect(store.getState().licenses.status)
      .toEqual('successful');
  });

  test('failed licenses retrieval', async () => {
    axiosMock.onGet(licensesApiUrl)
      .reply(500);

    expect(store.getState().licenses.status)
      .toEqual('in-progress');

    await executeThunk(fetchLicenses(), store.dispatch, store.getState);

    expect(store.getState().licenses.data)
      .toEqual([]);

    expect(store.getState().licenses.status)
      .toEqual('failed');
  });

  test('Should fetch multiple pages of catalogs', async () => {
    const catalogApiUrl = `${process.env.CATALOG_PLUGIN_API_BASE_URL}/flexible-catalogs/`;

    const mockResponsePage1 = {
      count: 2,
      num_pages: 2,
      next: '/flexible-catalogs/?page=2',
      current_page: 1,
      results: [
        {
          id: '1',
          slug: 'full',
          name: 'full catalog',
        },
      ],
    };

    const mockResponsePage2 = {
      count: 2,
      num_pages: 2,
      next: null,
      current_page: 2,
      results: [
        {
          id: '2',
          slug: 'demo',
          name: 'demo catalog',
        },
      ],
    };

    axiosMock.onGet(catalogApiUrl).replyOnce(200, mockResponsePage1);
    axiosMock.onGet(catalogApiUrl).replyOnce(200, mockResponsePage2);

    await executeThunk(fetchCatalogs(), store.dispatch, store.getState);

    expect(store.getState().licenses.catalogs.status).toEqual('successful');

    expect(axiosMock.history.get.length).toBe(2);
  });
});
