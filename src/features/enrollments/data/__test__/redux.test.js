import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { waitFor } from '@testing-library/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { enrollmentsApiSlice } from 'features/enrollments/data/apiSlice';
import { updateEnrollmentAction } from 'features/enrollments/data/thunks';
import { initializeStore } from 'store';

import 'features/enrollments/data/__factories__';

const enrollmentsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments/`;
let axiosMock;
let store;

const initiate = (args) => store.dispatch(
  enrollmentsApiSlice.endpoints.getStudentEnrollments.initiate(args),
);

describe('Enrollments RTK Query data layer tests', () => {
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

  test('successful enrollments retrieval is camelCased', async () => {
    axiosMock.onGet(enrollmentsApiUrl)
      .reply(200, { results: Factory.build('enrollmentsList') });

    const result = await initiate({ institution: 1 });

    expect(result.isSuccess).toBe(true);
    expect(result.data.results)
      .toEqual([
        {
          id: 1,
          institution: 'Training Center 1',
          masterCourseName: 'master course 1',
          masterCourseId: 'master-course-id-1',
          ccxId: 'ccx-course-1',
          ccxName: 'ccx name 1',
          ccxAdminEmail: 'admin1@example.com',
          learnerEmail: 'lerner1@example.com',
          status: 'Inactive',
          remainingCourseAccessDuration: 0,
          created: '2022-01-14T16:15:10.758039Z',
        },
        {
          id: 2,
          institution: 'Training Center 2',
          masterCourseName: 'master course 2',
          masterCourseId: 'master-course-id-2',
          ccxId: 'ccx-course-2',
          ccxName: 'ccx name 2',
          ccxAdminEmail: 'admin2@example.com',
          learnerEmail: 'lerner2@example.com',
          status: 'Active',
          remainingCourseAccessDuration: 60,
          created: '2022-01-14T16:15:10.758039Z',
        },
        {
          id: 3,
          institution: 'Training Center 3',
          masterCourseName: 'master course 3',
          masterCourseId: 'master-course-id-3',
          ccxId: 'ccx-course-3',
          ccxName: 'ccx name 3',
          ccxAdminEmail: 'admin3@example.com',
          learnerEmail: 'lerner3@example.com',
          status: 'Pending',
          remainingCourseAccessDuration: 180,
          created: '2022-01-14T16:15:10.758039Z',
        },
      ]);
  });

  test('the request is filtered by the selected institution', async () => {
    axiosMock.onGet(enrollmentsApiUrl)
      .reply(200, { results: Factory.build('enrollmentsList') });

    await initiate({ institution: 5 });

    expect(axiosMock.history.get[0].params)
      .toEqual(expect.objectContaining({ institution: 5 }));
  });

  test('reuses the cached result for the same institution without a new request', async () => {
    axiosMock.onGet(enrollmentsApiUrl)
      .reply(200, { results: Factory.build('enrollmentsList') });

    await initiate({ institution: 1 });
    await initiate({ institution: 1 });

    expect(axiosMock.history.get).toHaveLength(1);
  });

  test('requests independently and keeps separate cache entries per institution', async () => {
    axiosMock.onGet(enrollmentsApiUrl)
      .reply(200, { results: Factory.build('enrollmentsList') });

    await initiate({ institution: 1 });
    await initiate({ institution: 2 });

    expect(axiosMock.history.get).toHaveLength(2);
  });

  test('failed enrollments retrieval sets the error state', async () => {
    axiosMock.onGet(enrollmentsApiUrl)
      .reply(500);

    const result = await initiate({ institution: 1 });

    expect(result.isError).toBe(true);
  });

  test('updating an enrollment invalidates the cache and refetches the subscribed query', async () => {
    axiosMock.onGet(enrollmentsApiUrl)
      .reply(200, { results: Factory.build('enrollmentsList') });
    axiosMock.onPost(/students_update_enrollment/)
      .reply(200, {});

    const subscription = initiate({ institution: 1 });
    await subscription;

    expect(axiosMock.history.get).toHaveLength(1);

    await store.dispatch(updateEnrollmentAction(new FormData(), 'ccx-course-1'));

    await waitFor(() => expect(axiosMock.history.get.length).toBeGreaterThan(1));

    const lastGet = axiosMock.history.get[axiosMock.history.get.length - 1];
    expect(lastGet.params).toEqual(expect.objectContaining({ institution: 1 }));

    subscription.unsubscribe();
  });
});
