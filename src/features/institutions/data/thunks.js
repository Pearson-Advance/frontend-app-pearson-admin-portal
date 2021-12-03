import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getInstitutions, postInstitution } from './api';
import {
  fetchInstitutionsFailed,
  fetchInstitutionsRequest,
  fetchInstitutionsSuccess,
  postInstitutionSuccess,
  postInstitutionFailed,
} from './slices';

/**
 * Fetches all the institutions.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchInstitutions(search, active, name) {
  return async (dispatch) => {
    try {
      dispatch(fetchInstitutionsRequest());
      dispatch(fetchInstitutionsSuccess(camelCaseObject((await getInstitutions(search, active, name)).data)));
    } catch (error) {
      dispatch(fetchInstitutionsFailed());
      logError(error);
    }
  };
}

/**
 * Post Institution.
 * @returns {(function(*): Promise<void>)|*}
 */
 export function createInstitution(name, shortName, active) {
  return async (dispatch) => {
    try {
      dispatch(postInstitutionSuccess(camelCaseObject((await postInstitution(name, shortName, active)).data)));
    } catch (error) {
      dispatch(postInstitutionFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
 }
