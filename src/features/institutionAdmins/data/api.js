import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const institutionAdminURL = () => `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/institution-admin/`;

export function getInstitutionAdmins(selectedInstitution = null) {
  const params = {};
  if (selectedInstitution) {
    params.institution_id = selectedInstitution;
  }
  return getAuthenticatedHttpClient().get(institutionAdminURL(), { params: { ...params } });
}

export function postInstitutionAdmin(institutionId, adminEmail) {
  return getAuthenticatedHttpClient().post(
    institutionAdminURL(),
    snakeCaseObject({ institutionId, adminEmail }),
  );
}

export function patchInstitutionAdmin(id, active) {
  return getAuthenticatedHttpClient().patch(
    `${institutionAdminURL()}${id}/`,
    snakeCaseObject({ active }),
  );
}
