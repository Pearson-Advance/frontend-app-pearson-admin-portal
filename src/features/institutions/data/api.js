import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export function getInstitutions(search, active, name) {
  const params = {};

  if (search) { params.search = search; }
  if (active) { params.active = active; }
  if (name) { params.name = name; }

  return getAuthenticatedHttpClient().get(`${process.env.COURSE_OPERATIONS_API_BASE_URL}/institutions/`, { params });
}
