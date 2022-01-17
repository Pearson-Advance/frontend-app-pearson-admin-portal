import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getInstitutions, postInstitution, updateInstitution } from './api';
import {
  fetchInstitutionsFailed,
  fetchInstitutionsRequest,
  fetchInstitutionsSuccess,
  postInstitutionFailed,
  postInstitutionSuccess,
  patchInstitutionFailed,
  patchInstitutionSuccess,
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
export function createInstitution(name, shortName, externalId, active) {
  return async (dispatch) => {
    try {
      dispatch(postInstitutionSuccess(camelCaseObject((await postInstitution(
        name,
        shortName,
        externalId,
        active,
      )).data)));
    } catch (error) {
      dispatch(postInstitutionFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}

export function editInstitution(id, name, shortName, externalId, active) {
  return async (dispatch) => {
    try {
      dispatch(patchInstitutionSuccess(camelCaseObject((await updateInstitution(
        id,
        name,
        shortName,
        externalId,
        active,
      )).data)));
    } catch (error) {
      dispatch(patchInstitutionFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}
