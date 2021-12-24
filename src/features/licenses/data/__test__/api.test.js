import MockAdapter from 'axios-mock-adapter';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getLicenses } from '../api';

const licensesApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
let axiosMock = null;

describe('Licenses API tests', () => {
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

  test('Successfully complete a get request to the licenses endpoint', async () => {
    const expectedResponse = {
      data: [],
    };

    axiosMock.onGet(licensesApiUrl).reply(200, { ...expectedResponse });

    const response = await getLicenses();

    expect(response.data).toEqual(expectedResponse);
  });
});