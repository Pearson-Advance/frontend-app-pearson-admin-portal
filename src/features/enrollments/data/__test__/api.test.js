import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getExportStudentEnrollments } from '../api';

const enrollmentsExportApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments-export/`;
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
});
