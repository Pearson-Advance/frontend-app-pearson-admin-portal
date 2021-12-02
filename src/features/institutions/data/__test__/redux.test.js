import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { fetchInstitutions } from 'features/institutions/data/thunks';
import { executeThunk } from 'test-utils';
import { initializeStore } from 'store';

import 'features/institutions/data/__factories__';

const institutionsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institutions/`;
let axiosMock;
let store;

describe('Institutions data layer tests', () => {
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

  afterEach(() => {
    axiosMock.reset();
  });

  test('successful institutions retrieval', async () => {
    axiosMock.onGet(institutionsApiUrl)
      .reply(200, Factory.build('institutionsList'));

    expect(store.getState().institutions.status)
      .toEqual('in-progress');

    await executeThunk(fetchInstitutions(), store.dispatch, store.getState);

    expect(store.getState().institutions.data)
      .toEqual([
        {
          id: 1, name: 'Training Center 1', shortName: 'TC1', active: true,
        },
        {
          id: 2, name: 'Training Center 2', shortName: 'TC2', active: true,
        },
      ]);

    expect(store.getState().institutions.status)
      .toEqual('successful');
  });

  test('failed institutions retrieval', async () => {
    axiosMock.onGet(institutionsApiUrl)
      .reply(500);

    expect(store.getState().institutions.status)
      .toEqual('in-progress');

    await executeThunk(fetchInstitutions(), store.dispatch, store.getState);

    expect(store.getState().institutions.data)
      .toEqual([]);

    expect(store.getState().institutions.status)
      .toEqual('failed');
  });
});
