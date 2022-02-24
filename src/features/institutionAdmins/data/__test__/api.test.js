import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getInstitutionAdmins } from '../api';

const institutionAdminsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institution-admin/`;
let axiosMock = null;

describe('Institution Admin API tests', () => {
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

  test('Successfully complete a get request to institution admin endpoint', async () => {
    const expectedResponse = { data: [] };

    axiosMock.onGet(institutionAdminsApiUrl).reply(200, { ...expectedResponse });

    const response = await getInstitutionAdmins();

    expect(response.data).toEqual(expectedResponse);
  });
});
