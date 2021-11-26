import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getHttpErrorStatus } from 'features/shared/data/utils';
import { getInstitutions } from './api';
import {
  fetchInstitutionsDenied,
  fetchInstitutionsFailed,
  fetchInstitutionsRequest,
  fetchInstitutionsSuccess,
} from './slices';

/**
 * Fetches all the institutions.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchInstitutions() {
  return async (dispatch) => {
    try {
      dispatch(fetchInstitutionsRequest());
      const data = await getInstitutions();
      const formattedData = camelCaseObject(data);
      dispatch(fetchInstitutionsSuccess(formattedData));
    } catch (error) {
      if (getHttpErrorStatus(error) === 403) {
        dispatch(fetchInstitutionsDenied());
      } else {
        dispatch(fetchInstitutionsFailed());
      }
      logError(error);
    }
  };
}
