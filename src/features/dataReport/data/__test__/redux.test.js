import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { fetchLicenseUsageMCLevel, fetchLicenseUsageCCXLevel } from 'features/dataReport/data/thunks';
import { executeThunk } from 'test-utils';
import { initializeStore } from 'store';

import 'features/dataReport/data/__factories__';

const mcReportsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-usage/`;
const ccxReportsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/detailed-license-usage/`;
let axiosMock;
let store;

describe('CCX Level license usage data report tests', () => {
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

  test('Successful CCX level license usage date retrieval', async () => {
    axiosMock.onGet(ccxReportsApiUrl)
      .reply(200, { results: Factory.build('ccxReportList') });

    expect(store.getState().dataReport.status)
      .toEqual('in-progress');

    await executeThunk(fetchLicenseUsageCCXLevel(), store.dispatch, store.getState);

    expect(store.getState().dataReport.ccxLevelResponse.results)
      .toEqual([
        {
          institution: 'Training Center 1',
          masterCourse: 'course-v1:demo+demo+2021',
          purchasedSeats: 1,
          ccxId: 'ccx-v1:demo+demo1+2021+ccx@1',
          ccxName: 'CCX-1',
          institutionAdmin: 'admin-1',
          totalEnrolled: 1,
        },
        {
          institution: 'Training Center 2',
          masterCourse: 'course-v1:demo+demo+2022',
          purchasedSeats: 2,
          ccxId: 'ccx-v1:demo+demo1+2021+ccx@2',
          ccxName: 'CCX-2',
          institutionAdmin: 'admin-2',
          totalEnrolled: 2,
        },
        {
          institution: 'Training Center 3',
          masterCourse: 'course-v1:demo+demo+2023',
          purchasedSeats: 3,
          ccxId: 'ccx-v1:demo+demo1+2021+ccx@3',
          ccxName: 'CCX-3',
          institutionAdmin: 'admin-3',
          totalEnrolled: 3,
        },
      ]);

    expect(store.getState().dataReport.status)
      .toEqual('successful');
  });

  test('failed CCX level license usage date retrieval', async () => {
    axiosMock.onGet(ccxReportsApiUrl)
      .reply(500);

    expect(store.getState().dataReport.status)
      .toEqual('in-progress');

    await executeThunk(fetchLicenseUsageCCXLevel(), store.dispatch, store.getState);

    expect(store.getState().dataReport.ccxLevelResponse.results)
      .toEqual([]);

    expect(store.getState().dataReport.status)
      .toEqual('failed');
  });
});

describe('MC Level license usage data report tests', () => {
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

    expect(store.getState().dataReport.mcLevelResponse.results)
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

    expect(store.getState().dataReport.mcLevelResponse.results)
      .toEqual([]);

    expect(store.getState().dataReport.status)
      .toEqual('failed');
  });
});
