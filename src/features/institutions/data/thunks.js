import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getInstitutions, postInstitution, updateInstitution } from './api';
import {
  fetchInstitutionsFailed,
  fetchInstitutionsRequest,
  fetchInstitutionsSuccess,
  institutionPostFailed,
  institutionPostSuccess,
  institutionPatchFailed,
  institutionPatchSuccess,
} from './slices';

/**
 * Fetches all the institutions.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchInstitutions() {
  return async (dispatch) => {
    try {
      dispatch(fetchInstitutionsRequest());
      dispatch(fetchInstitutionsSuccess(camelCaseObject((await getInstitutions()).data)));
    } catch (error) {
      dispatch(fetchInstitutionsFailed());
      logError(error);
    }
  };
}

/**
 * Post InstitutionCreation.
 * @returns {(function(*): Promise<void>)|*}
 */
export function createInstitution(name, shortName, active) {
  return async (dispatch) => {
    try {
      dispatch(institutionPostSuccess(camelCaseObject((await postInstitution(name, shortName, active)).data)));
    } catch (error) {
      dispatch(institutionPostFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}

export function editInstitution(id, name, shortName, active) {
  return async (dispatch) => {
    try {
      dispatch(institutionPatchSuccess(camelCaseObject((await updateInstitution(id, name, shortName, active)).data)));
    } catch (error) {
      dispatch(institutionPatchFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}
