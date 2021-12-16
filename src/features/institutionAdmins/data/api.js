import { snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const institutionAdminURL = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institution-admin/`;

export function getInstitutionAdmins() {
  return getAuthenticatedHttpClient().get(institutionAdminURL);
}

export function postInstitutionAdmin(institutionId, adminEmail) {
  return getAuthenticatedHttpClient().post(
    institutionAdminURL,
    snakeCaseObject({ institutionId, adminEmail }),
  );
}
