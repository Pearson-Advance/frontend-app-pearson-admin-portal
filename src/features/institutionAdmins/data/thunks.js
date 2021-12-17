import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getInstitutionAdmins, postInstitutionAdmin } from './api';
import {
  fetchInstitutionAdminsFailed,
  fetchInstitutionAdminsRequest,
  fetchInstitutionAdminsSuccess,
  postAdminSuccess,
  postAdminFailed,
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

export function createInstitutionAdmin(institution, coach) {
  return async (dispatch) => {
    try {
      dispatch(postAdminSuccess(camelCaseObject((await postInstitutionAdmin(institution, coach)).data)));
    } catch (error) {
      dispatch(postAdminFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}
