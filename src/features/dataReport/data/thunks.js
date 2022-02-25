import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import {
  getExportLicenseUsageCCXLevel,
  getExportLicenseUsageMCLevel,
  getLicenseUsageCCXLevel,
  getLicenseUsageMCLevel,
} from './api';
import {
  fetchLicenseUsageRequest,
  fetchLicenseUsageCCXLevelSuccess,
  fetchLicenseUsageFailed,
  fetchLicenseUsageMCLevelSuccess,
} from './slices';

/**
 * Fetches all CCX level license usage data.
 * @returns {(function(*): Promise<void>)|*}
 */
function fetchLicenseUsageCCXLevel(filters) {
  return async (dispatch) => {
    try {
      dispatch(fetchLicenseUsageRequest());
      dispatch(fetchLicenseUsageCCXLevelSuccess(camelCaseObject((await getLicenseUsageCCXLevel(filters)).data)));
    } catch (error) {
      dispatch(fetchLicenseUsageFailed());
      logError(error);
    }
  };
}

/**
 * Fetches all MC (Master courses) license usage data,
 *  which satisfy the filters criteria level.
 * @returns {(function(*): Promise<void>)|*}
 */
function fetchLicenseUsageMCLevel(filters) {
  return async (dispatch) => {
    try {
      dispatch(fetchLicenseUsageRequest());
      dispatch(fetchLicenseUsageMCLevelSuccess(camelCaseObject((await getLicenseUsageMCLevel(filters)).data)));
    } catch (error) {
      dispatch(fetchLicenseUsageFailed());
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

export {
  fetchLicenseUsageCCXLevel,
  fetchExportLicenseUsageCCXLevel,
  fetchLicenseUsageMCLevel,
  fetchExportLicenseUsageMCLevel,
};
