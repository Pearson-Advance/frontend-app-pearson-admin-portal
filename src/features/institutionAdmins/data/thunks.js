import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getInstitutionAdmins } from './api';
import {
  fetchInstitutionAdminsFailed,
  fetchInstitutionAdminsRequest,
  fetchInstitutionAdminsSuccess,
} from './slices';

/**
 * Fetches all the institution admins.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchInstitutionAdmins() {
  return async (dispatch) => {
    try {
      dispatch(fetchInstitutionAdminsRequest());
      dispatch(fetchInstitutionAdminsSuccess(camelCaseObject((await getInstitutionAdmins()).data)));
    } catch (error) {
      dispatch(fetchInstitutionAdminsFailed());
      logError(error);
    }
  };
}
