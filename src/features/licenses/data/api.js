import { snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
const managedCoursesEndpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/managed-courses/`;

export function getLicenses() {
  return getAuthenticatedHttpClient().get(endpoint);
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
