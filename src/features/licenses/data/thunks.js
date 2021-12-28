import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getLicenses, getLicenseById } from './api';
import {
  fetchLicensesRequest,
  fetchLicensesSuccess,
  fetchLicensesFailed,
  fetchLicenseRequest,
  fetchLicenseSuccess,
  fetchLicenseFailed,
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

/**
 * Fetches a license by id.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchLicensebyId(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchLicenseRequest());
      dispatch(fetchLicenseSuccess(camelCaseObject((await getLicenseById(id)).data)));
    } catch (error) {
      dispatch(fetchLicenseFailed());
      logError(error);
    }
  };
}
