import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { fetchStudentEnrollments } from 'features/enrollments/data/thunks';
import { executeThunk } from 'test-utils';
import { initializeStore } from 'store';

import 'features/enrollments/data/__factories__';

const enrollmentsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments/`;
let axiosMock;
let store;

describe('Enrollments data layer tests', () => {
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

  test('successful enrollments retrieval', async () => {
    axiosMock.onGet(enrollmentsApiUrl)
      .reply(200, { results: Factory.build('enrollmentsList') });

    expect(store.getState().enrollments.status)
      .toEqual('in-progress');

    await executeThunk(fetchStudentEnrollments(), store.dispatch, store.getState);

    expect(store.getState().enrollments.requestResponse.results)
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

    expect(store.getState().enrollments.status)
      .toEqual('successful');
  });

  test('failed enrollments retrieval', async () => {
    axiosMock.onGet(enrollmentsApiUrl)
      .reply(500);

    expect(store.getState().enrollments.status)
      .toEqual('in-progress');

    await executeThunk(fetchStudentEnrollments(), store.dispatch, store.getState);

    expect(store.getState().enrollments.data)
      .toEqual([]);

    expect(store.getState().enrollments.status)
      .toEqual('failed');
  });
});
