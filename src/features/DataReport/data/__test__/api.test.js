import MockAdapter from 'axios-mock-adapter';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import {
  getLicenseUsageMCLevel,
  getLicenseUsageCCXLevel,
} from '../api';

const mcReportApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-usage/`;
const ccxReportApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/detailed-license-usage/`;
let axiosMock = null;

describe('Master Course level license usage API tests', () => {
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

  test('Successfully complete a get request to license usage data endpoint', async () => {
    const expectedResponse = { data: [] };

    axiosMock.onGet(mcReportApiUrl).reply(200, { ...expectedResponse });

    const response = await getLicenseUsageMCLevel();

    expect(response.data).toEqual(expectedResponse);
  });

  test('Successfully complete a get request to detailed license usage data endpoint', async () => {
    const expectedResponse = { data: [] };

    axiosMock.onGet(ccxReportApiUrl).reply(200, { ...expectedResponse });

    const response = await getLicenseUsageCCXLevel();

    expect(response.data).toEqual(expectedResponse);
  });
});
