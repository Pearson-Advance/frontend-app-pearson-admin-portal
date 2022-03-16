import { snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
const eligibleCoursesEndpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-eligible-courses/`;
const ordersEndpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-orders/`;

export function getLicenses(selectedInstitution = null) {
  const params = {};

  if (selectedInstitution) {
    params.institution_id = selectedInstitution;
  }

  return getAuthenticatedHttpClient().get(endpoint, { params: { ...params } });
}

export function getLicenseById(id) {
  return getAuthenticatedHttpClient().get(`${endpoint}${id}/`);
}

export function postLicense(institution, course, courseAccessDuration, status) {
  return getAuthenticatedHttpClient().post(
    endpoint,
    snakeCaseObject({
      institution: { id: institution },
      course: { id: course },
      courseAccessDuration,
      status,
    }),
  );
}

export function getEligibleCourses(url = eligibleCoursesEndpoint) {
  return getAuthenticatedHttpClient().get(url);
}

export function postLicenseOrder(license, orderReference, purchasedSeats, active = true) {
  return getAuthenticatedHttpClient().post(
    ordersEndpoint,
    snakeCaseObject({
      license, orderReference, purchasedSeats, active,
    }),
  );
}

export function updateLicenseOrder(orderId, orderReference, purchasedSeats) {
  return getAuthenticatedHttpClient().patch(
    `${ordersEndpoint}${orderId}/`,
    snakeCaseObject({
      orderReference,
      purchasedSeats,
    }),
  );
}
