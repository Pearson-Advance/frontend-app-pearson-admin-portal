import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getLicenses } from './api';
import {
  fetchLicensesRequest,
  fetchLicensesSuccess,
  fetchLicensesFailed,
} from './slices';

/**
 * Fetches all licenses.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchLicenses() {
  return async (dispatch) => {
    try {
      dispatch(fetchLicensesRequest());
      dispatch(fetchLicensesSuccess(camelCaseObject((await getLicenses()).data)));
    } catch (error) {
      dispatch(fetchLicensesFailed());
      logError(error);
    }
  };
}
