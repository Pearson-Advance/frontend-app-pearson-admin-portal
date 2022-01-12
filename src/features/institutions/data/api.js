import { snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const institutionURL = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institutions/`;

export function getInstitutions() {
  return getAuthenticatedHttpClient().get(institutionURL);
}

export function postInstitution(name, shortName, externalId, active = true) {
  return getAuthenticatedHttpClient().post(
    institutionURL,
    snakeCaseObject({
      name, shortName, externalId, active,
    }),
  );
}

export function updateInstitution(id, name, shortName, externalId, active) {
  return getAuthenticatedHttpClient().patch(
    `${institutionURL}${id}/`,
    snakeCaseObject({
      name, shortName, externalId, active,
    }),
  );
}
