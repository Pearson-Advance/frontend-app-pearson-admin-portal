import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export function getInstitutions() {
  return getAuthenticatedHttpClient().get(`${process.env.COURSE_OPERATIONS_API_BASE_URL}/institutions/`, {});
}
