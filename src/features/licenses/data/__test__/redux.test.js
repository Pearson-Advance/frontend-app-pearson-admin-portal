import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { executeThunk } from 'test-utils';
import { initializeStore } from 'store';

import { DELETE_ORDER_ERROR_MESSAGES } from 'features/shared/data/constants';
import 'features/licenses/data/__factories__';
import { fetchLicenses, fetchCatalogs, removeLicenseOrder } from '../thunks';

const licensesApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
const licensesOrdersApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-orders/`;
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

  test('removeLicenseOrder resolves successfully on a 204 response', async () => {
    axiosMock.onDelete(`${licensesOrdersApiUrl}1/`).reply(204);

    const result = await store.dispatch(removeLicenseOrder(1));

    expect(result).toEqual({ success: true });
  });

  test('removeLicenseOrder treats a 404 as already removed', async () => {
    axiosMock.onDelete(`${licensesOrdersApiUrl}1/`).reply(404);

    const result = await store.dispatch(removeLicenseOrder(1));

    expect(result).toEqual({ success: true });
  });

  test('removeLicenseOrder returns a permission error on a 403 response', async () => {
    axiosMock.onDelete(`${licensesOrdersApiUrl}1/`).reply(403);

    const result = await store.dispatch(removeLicenseOrder(1));

    expect(result).toEqual({
      success: false,
      error: DELETE_ORDER_ERROR_MESSAGES[403],
    });
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
