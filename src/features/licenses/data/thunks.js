import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getLicenses } from './api';
import {
  fetchLicensesRequest,
  fetchLicensesSuccess,
  fetchLicensesFailed,
} from './slices';

/**
 * Fetches all the licenses.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchLicenses(pageSize, pageNumber) {
  return async (dispatch) => {
    try {
      dispatch(fetchLicensesRequest(pageSize, pageNumber));
      dispatch(fetchLicensesSuccess(camelCaseObject((await getLicenses(pageSize, pageNumber)).data)));
    } catch (error) {
      dispatch(fetchLicensesFailed());
      logError(error);
    }
  };
}
