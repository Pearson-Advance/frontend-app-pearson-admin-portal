import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getInstitutions } from './api';
import {
  fetchInstitutionsFailed,
  fetchInstitutionsRequest,
  fetchInstitutionsSuccess,
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
