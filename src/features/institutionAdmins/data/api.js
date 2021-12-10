import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const institutionAdminURL = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institution-admin/`;

export function getInstitutionAdmins() {
  return getAuthenticatedHttpClient().get(institutionAdminURL);
}
