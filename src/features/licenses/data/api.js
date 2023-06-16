import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = () => `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license/`;
const eligibleCoursesEndpoint = () => `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license-eligible-courses/`;
const ordersEndpoint = () => `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license-orders/`;

export function getLicenses(selectedInstitution = null) {
  const params = {};

  if (selectedInstitution) {
    params.institution_id = selectedInstitution;
  }

  return getAuthenticatedHttpClient().get(endpoint(), { params: { ...params } });
}

export function getLicenseById(id) {
  return getAuthenticatedHttpClient().get(`${endpoint()}${id}/`);
}

export function postLicense(institution, courses, courseAccessDuration, status) {
  return getAuthenticatedHttpClient().post(
    endpoint(),
    snakeCaseObject({
      institution: { id: institution },
      courses,
      courseAccessDuration,
      status,
    }),
  );
}

export function updateLicense(licenseId, status, courses) {
  return getAuthenticatedHttpClient().patch(
    `${endpoint()}${licenseId}/`,
    snakeCaseObject({
      status,
      courses,
    }),
  );
}

export function getEligibleCourses(params) {
  return getAuthenticatedHttpClient().get(
    eligibleCoursesEndpoint(),
    { params: { ...params } },
  );
}

export function postLicenseOrder(license, orderReference, purchasedSeats, active = true) {
  return getAuthenticatedHttpClient().post(
    ordersEndpoint(),
    snakeCaseObject({
      license, orderReference, purchasedSeats, active,
    }),
  );
}

export function updateLicenseOrder(orderId, orderReference, purchasedSeats) {
  return getAuthenticatedHttpClient().patch(
    `${ordersEndpoint()}${orderId}/`,
    snakeCaseObject({
      orderReference,
      purchasedSeats,
    }),
  );
}
