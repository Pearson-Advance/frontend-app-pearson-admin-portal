import MockAdapter from 'axios-mock-adapter';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getLicenses, getLicenseById, updateLicenseOrder } from 'features/licenses/data/api';
import { snakeCaseObject } from '@edx/frontend-platform';

const licensesApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
const licensesOrdersApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-orders/`;
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

  test('Successfully complete a getLicenses request to the licenses endpoint', async () => {
    const expectedResponse = {
      data: [],
    };

    axiosMock.onGet(licensesApiUrl).reply(200, { ...expectedResponse });

    const response = await getLicenses();

    expect(response.data).toEqual(expectedResponse);
  });

  test('Successfully complete a get request to the licenses endpoint', async () => {
    const expectedResponse = {
      data: {
        institution: {
          name: 'Training center 1',
        },
        courses: [
          {
            displayName: 'Master Course',
          },
        ],
        purchasedSeats: 100,
        courseAccessDuration: 180,
        status: 'active',
        licenseOrder: [],
      },
    };

    axiosMock.onGet(`${licensesApiUrl}1/`).reply(200, { ...expectedResponse });

    const response = await getLicenseById(1);

    expect(response.data).toEqual(expectedResponse);
  });

  test('Successfully complete a patch request to the licenses orders endpoint', async () => {
    const expectedResponse = snakeCaseObject({
      orderReference: 'TEST04',
      purchasedSeats: 300,
    });

    axiosMock.onPatch(`${licensesOrdersApiUrl}1/`).reply(200, expectedResponse);

    const response = await updateLicenseOrder(1, 'TEST04', 300);

    expect(response.data).toEqual(expectedResponse);
  });
});
