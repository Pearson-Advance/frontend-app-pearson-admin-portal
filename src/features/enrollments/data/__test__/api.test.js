import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getStudentEnrollments } from '../api';

const institutionsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments/`;
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

  test('Successfully complete a get request to enrollments endpoint', async () => {
    const expectedResponse = { data: [] };

    axiosMock.onGet(institutionsApiUrl).reply(200, { ...expectedResponse });

    const response = await getStudentEnrollments();

    expect(response.data).toEqual(expectedResponse);
  });
});
