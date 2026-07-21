import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';
import { MAX_TABLE_RECORDS } from 'features/shared/data/constants';

function getLicenseUsageCCXLevel(filters, signal = null) {
  let params = {
    page_size: MAX_TABLE_RECORDS,
  };

  if (filters) {
    params = {
      ...params,
      ...snakeCaseObject(removeNullOrEmptyObjectAttributes(filters)),
    };
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/detailed-license-usage/`,
    { params, signal },
  );
}

function getLicenseUsageMCLevel(filters, signal = null) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license-usage/`,
    { params, signal },
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
