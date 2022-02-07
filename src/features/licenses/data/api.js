import { snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
const managedCoursesEndpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/managed-courses/`;
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

export function getLicenseManageCourses(url = managedCoursesEndpoint) {
  return getAuthenticatedHttpClient().get(url, { params: { site_org_filter: 1 } });
}

export function postLicenseOrder(license, orderReference, purchasedSeats, active = true) {
  return getAuthenticatedHttpClient().post(
    ordersEndpoint,
    snakeCaseObject({
      license, orderReference, purchasedSeats, active,
    }),
  );
}
