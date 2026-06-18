import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import {
  getExportLicenseUsageCCXLevel,
  getExportLicenseUsageMCLevel,
  getLicenseUsageCCXLevel,
  getLicenseUsageMCLevel,
} from './api';
import {
  fetchLicenseUsageCCXLevelRequest,
  fetchLicenseUsageCCXLevelSuccess,
  fetchLicenseUsageCCXLevelFailed,
  fetchLicenseUsageMCLevelRequest,
  fetchLicenseUsageMCLevelSuccess,
  fetchLicenseUsageMCLevelFailed,
} from './slices';

/**
 * Fetches all CCX level license usage data.
 * @returns {(function(*): Promise<void>)|*}
 */
let abortLicenseUsageCCXLevelController = null;
function fetchLicenseUsageCCXLevel(filters) {
  return async (dispatch) => {
    if (abortLicenseUsageCCXLevelController) {
      abortLicenseUsageCCXLevelController.abort();
    }

    abortLicenseUsageCCXLevelController = new AbortController();
    const { signal } = abortLicenseUsageCCXLevelController;

    try {
      dispatch(fetchLicenseUsageCCXLevelRequest());
      dispatch(fetchLicenseUsageCCXLevelSuccess(
        camelCaseObject((await getLicenseUsageCCXLevel(filters, signal)).data),
      ));
    } catch (error) {
      if (signal.aborted) {
        logError('License ccx canceled!');
        return;
      }
      dispatch(fetchLicenseUsageCCXLevelFailed());
      logError(error);
    }
  };
}

/**
 * Fetches all MC (Master courses) license usage data,
 *  which satisfy the filters criteria level.
 * @returns {(function(*): Promise<void>)|*}
 */
let abortLicenseUsageMCLevelController = null;
function fetchLicenseUsageMCLevel(filters) {
  return async (dispatch) => {
    if (abortLicenseUsageMCLevelController) {
      abortLicenseUsageMCLevelController.abort();
    }

    abortLicenseUsageMCLevelController = new AbortController();
    const { signal } = abortLicenseUsageMCLevelController;

    try {
      dispatch(fetchLicenseUsageMCLevelRequest());
      dispatch(fetchLicenseUsageMCLevelSuccess(camelCaseObject((await getLicenseUsageMCLevel(filters, signal)).data)));
    } catch (error) {
      if (signal.aborted) {
        logError('License mc canceled!');
        return;
      }
      dispatch(fetchLicenseUsageMCLevelFailed());
      logError(error);
    }
  };
}

/**
 * Export CCX Level license usage data.
 * @returns {(function(*): Promise<void>)|*}
 */
function fetchExportLicenseUsageCCXLevel(filters) {
  return async () => {
    try {
      const response = await getExportLicenseUsageCCXLevel(filters);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response.data]));

      link.setAttribute('download', `ccx_level_report_${(new Date().toISOString().toString())}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      logError(error);
    }
  };
}

/**
 * Export MC Level license usage data.
 * @returns {(function(*): Promise<void>)|*}
 */
function fetchExportLicenseUsageMCLevel(filters) {
  return async () => {
    try {
      const response = await getExportLicenseUsageMCLevel(filters);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response.data]));

      link.setAttribute('download', `mc_level_report_${(new Date().toISOString().toString())}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      logError(error);
    }
  };
}

function cancelFetchLicenseUsageCCXLevel() {
  return () => {
    if (abortLicenseUsageCCXLevelController) {
      abortLicenseUsageCCXLevelController.abort();
    }
  };
}

function cancelFetchLicenseUsageMCLevel() {
  return () => {
    if (abortLicenseUsageMCLevelController) {
      abortLicenseUsageMCLevelController.abort();
    }
  };
}

export {
  fetchLicenseUsageCCXLevel,
  cancelFetchLicenseUsageCCXLevel,
  fetchExportLicenseUsageCCXLevel,
  fetchLicenseUsageMCLevel,
  cancelFetchLicenseUsageMCLevel,
  fetchExportLicenseUsageMCLevel,
};
