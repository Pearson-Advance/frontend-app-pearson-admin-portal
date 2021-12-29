import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;

export function getLicenses() {
  return getAuthenticatedHttpClient().get(endpoint);
}

export function getLicenseById(id) {
  return getAuthenticatedHttpClient().get(`${endpoint}${id}/`);
}
