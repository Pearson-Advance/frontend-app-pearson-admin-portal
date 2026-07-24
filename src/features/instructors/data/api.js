import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';

/**
 * Peticiones Axios auxiliares directas para Instructores (Exportes, Mutaciones, etc.)
 */
function getExportInstructors(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_V2_BASE_URL}/instructors-export/`,
    { params },
    { responseType: 'blob' },
  );
}

export {
  getExportInstructors,
};
