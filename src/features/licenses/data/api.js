import { snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license/`;

export function getLicenses(pageSize, pageNumber) {
  const params = snakeCaseObject({ pageSize, page:pageNumber });

  console.log('params-...............')
  console.log(params)
  return getAuthenticatedHttpClient().get(endpoint, { params });
}
