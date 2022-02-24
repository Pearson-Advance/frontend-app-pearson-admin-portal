import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { fetchLicenseUsageMCLevel } from 'features/DataReport/data/thunks';
import { executeThunk } from 'test-utils';
import { initializeStore } from 'store';

import 'features/DataReport/data/__factories__';

const mcReportsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-usage/`;
let axiosMock;
let store;

describe('Report data layer tests', () => {
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

  test('Successful MC level license usage date retrieval', async () => {
    axiosMock.onGet(mcReportsApiUrl)
      .reply(200, { results: Factory.build('mcReportList') });

    expect(store.getState().dataReport.status)
      .toEqual('in-progress');

    await executeThunk(fetchLicenseUsageMCLevel(), store.dispatch, store.getState);

    expect(store.getState().dataReport.mcLevelData.results)
      .toEqual([
        {
          institution: 'Training Center 1',
          masterCourseId: 'master-course-id-1',
          purchasedSeats: 1,
          totalEnrolled: 1,
        },
        {
          institution: 'Training Center 2',
          masterCourseId: 'master-course-id-2',
          purchasedSeats: 2,
          totalEnrolled: 2,
        },
        {
          institution: 'Training Center 3',
          masterCourseId: 'master-course-id-3',
          purchasedSeats: 3,
          totalEnrolled: 3,
        },
      ]);

    expect(store.getState().dataReport.status)
      .toEqual('successful');
  });

  test('failed MC level license usage date retrieval', async () => {
    axiosMock.onGet(mcReportsApiUrl)
      .reply(500);

    expect(store.getState().dataReport.status)
      .toEqual('in-progress');

    await executeThunk(fetchLicenseUsageMCLevel(), store.dispatch, store.getState);

    expect(store.getState().dataReport.mcLevelData.results)
      .toEqual([]);

    expect(store.getState().dataReport.status)
      .toEqual('failed');
  });
});
