import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getInstitutionAdmins, postInstitutionAdmin, patchInstitutionAdmin } from './api';
import {
  fetchInstitutionAdminsFailed,
  fetchInstitutionAdminsRequest,
  fetchInstitutionAdminsSuccess,
  postAdminSuccess,
  postAdminFailed,
  patchAdminRequest,
  patchAdminSuccess,
  patchAdminFailed,
} from './slices';

/**
 * Fetches all the institution admins.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchInstitutionAdmins(selectedInstitution = null) {
  return async (dispatch) => {
    try {
      dispatch(fetchInstitutionAdminsRequest());
      dispatch(fetchInstitutionAdminsSuccess(camelCaseObject((await getInstitutionAdmins(selectedInstitution)).data)));
    } catch (error) {
      dispatch(fetchInstitutionAdminsFailed());
      logError(error);
    }
  };
}

export function createInstitutionAdmin(institution, admin) {
  return async (dispatch) => {
    try {
      dispatch(postAdminSuccess(camelCaseObject((await postInstitutionAdmin(institution, admin)).data)));
    } catch (error) {
      dispatch(postAdminFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}

export function editInstitutionAdmin(id, active) {
  return async (dispatch) => {
    try {
      dispatch(patchAdminRequest({ id }));
      dispatch(patchAdminSuccess(camelCaseObject((await patchInstitutionAdmin(id, active)).data)));
    } catch (error) {
      dispatch(patchAdminFailed({ id }));
      logError(error);
    }
  };
}
