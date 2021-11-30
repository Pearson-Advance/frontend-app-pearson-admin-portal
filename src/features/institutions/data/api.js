import { snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const institutionURL = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institutions/`;

export function getInstitutions(search, active, name) {
  const params = {};

  if (search) { params.search = search; }
  if (active) { params.active = active; }
  if (name) { params.name = name; }

  return getAuthenticatedHttpClient().get(institutionURL, { params });
}

export async function postInstitution(name, shortName, active = true) {
  const { data } = await getAuthenticatedHttpClient().post(
    institutionURL,
    snakeCaseObject({ name, shortName, active }),
  );
  return data;
}
