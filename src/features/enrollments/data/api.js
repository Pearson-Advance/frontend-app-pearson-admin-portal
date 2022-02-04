import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments/`;

export function getStudentEnrollments() {
  return getAuthenticatedHttpClient().get(endpoint);
}
