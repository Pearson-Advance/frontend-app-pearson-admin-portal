import { snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;
const managedCoursesEndpoint = `${process.env.LMS_BASE_URL}/api/courses/v1/courses/`;
const managedCoursesPageSize = 100000; // We must not limit the pageSize in this endpoint.

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
  return getAuthenticatedHttpClient().get(url, { params: { page_size: managedCoursesPageSize } });
}
