import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';

function getLicenseUsageCCXLevel(filters, signal = null) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/detailed-license-usage/`,
    { params, signal },
  );
}

function getLicenseUsageMCLevel(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license-usage/`,
    { params },
  );
}

function getExportLicenseUsageCCXLevel(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/detailed-license-usage-export/`,
    { params },
    { responseType: 'blob' },
  );
}

function getExportLicenseUsageMCLevel(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license-usage-export/`,
    { params },
    { responseType: 'blob' },
  );
}

export {
  getLicenseUsageCCXLevel,
  getExportLicenseUsageCCXLevel,
  getLicenseUsageMCLevel,
  getExportLicenseUsageMCLevel,
};
