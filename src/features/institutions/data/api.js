import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

export const institutionsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institutions/`;

export async function getInstitutions() {
  const { data } = await getAuthenticatedHttpClient().get(institutionsApiUrl, {});
  return data;
}
