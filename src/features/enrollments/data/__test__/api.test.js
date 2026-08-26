import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import {
  getExportStudentEnrollments,
  handleBulkEnrollments,
  extendBulkEnrollments,
} from '../api';

const enrollmentsExportApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments-export/`;
const extendEnrollmentApiUrl = `${process.env.COURSE_OPERATIONS_API_V2_BASE_URL}/extend-enrollment/`;
let axiosMock = null;

describe('Enrollments API tests', () => {
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
  });

  afterEach(() => {
    axiosMock.reset();
  });

  test('Successfully complete a get request to the enrollments export endpoint', async () => {
    const expectedResponse = { data: [] };

    axiosMock.onGet(enrollmentsExportApiUrl).reply(200, { ...expectedResponse });

    const response = await getExportStudentEnrollments();

    expect(response.data).toEqual(expectedResponse);
  });

  test('handleBulkEnrollments groups emails by course and constructs FormData correctly', async () => {
    const enrollments = [
      { learnerEmail: 'user1@acme.com', ccxId: 'course-1' },
      { learnerEmail: 'user2@acme.com', ccxId: 'course-1' },
      { learnerEmail: 'user3@acme.com', ccxId: 'course-2' },
    ];

    const expectedUrl1 = `${process.env.LMS_BASE_URL}/courses/course-1/instructor/api/students_update_enrollment`;
    const expectedUrl2 = `${process.env.LMS_BASE_URL}/courses/course-2/instructor/api/students_update_enrollment`;

    axiosMock.onPost(expectedUrl1).reply((config) => {
      expect(config.data).toBeInstanceOf(FormData);
      expect(config.data.get('identifiers')).toEqual('user1@acme.com,user2@acme.com');
      expect(config.data.get('action')).toEqual('unenroll');
      expect(config.data.get('auto_enroll')).toEqual('true');
      expect(config.data.get('email_students')).toEqual('false');
      expect(config.data.get('allow_lab_unenroll')).toEqual('true');
      return [200, { status: 'success' }];
    });

    axiosMock.onPost(expectedUrl2).reply((config) => {
      expect(config.data).toBeInstanceOf(FormData);
      expect(config.data.get('identifiers')).toEqual('user3@acme.com');
      expect(config.data.get('action')).toEqual('unenroll');
      return [200, { status: 'success' }];
    });

    const responses = await handleBulkEnrollments(enrollments, 'unenroll');

    expect(responses).toHaveLength(2);
    expect(responses[0].status).toEqual('fulfilled');
    expect(responses[0].value.data).toEqual({ status: 'success' });
    expect(responses[1].status).toEqual('fulfilled');
    expect(responses[1].value.data).toEqual({ status: 'success' });
  });

  test('extendBulkEnrollments posts requests for each item to extend endpoint', async () => {
    const enrollments = [
      { learnerEmail: 'user1@acme.com', ccxId: '101' },
      { learnerEmail: 'user2@acme.com', ccxId: '102' },
    ];
    const isoDate = '2026-12-31T00:00:00.000Z';

    axiosMock.onPost(extendEnrollmentApiUrl).reply((config) => {
      expect(config.data).toBeInstanceOf(FormData);
      expect(config.data.get('date')).toEqual(isoDate);
      return [200, { status: 'extended' }];
    });

    const responses = await extendBulkEnrollments(enrollments, isoDate);

    expect(responses).toHaveLength(2);
    expect(responses[0].status).toEqual('fulfilled');
    expect(responses[0].value.data).toEqual({ status: 'extended' });
    expect(responses[1].status).toEqual('fulfilled');
    expect(responses[1].value.data).toEqual({ status: 'extended' });
  });
});
