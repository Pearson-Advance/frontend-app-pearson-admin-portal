import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const institutionURL = () => `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/institutions/`;
const institutionDefaultOrdering = 'name';

export function getInstitutions(selectedInstitution = null, ordering = institutionDefaultOrdering) {
  const params = { ordering };

  if (selectedInstitution) {
    params.id = selectedInstitution;
  }

  return getAuthenticatedHttpClient().get(institutionURL(), { params: { ...params } });
}

export function postInstitution(name, shortName, externalId, active = true) {
  return getAuthenticatedHttpClient().post(
    institutionURL(),
    snakeCaseObject({
      name, shortName, externalId, active,
    }),
  );
}

export function updateInstitution(id, name, shortName, externalId, active) {
  return getAuthenticatedHttpClient().patch(
    `${institutionURL()}${id}/`,
    snakeCaseObject({
      name, shortName, externalId, active,
    }),
  );
}
