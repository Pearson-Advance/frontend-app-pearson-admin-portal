import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { snakeCaseObject } from '@edx/frontend-platform';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';

function getLicenseUsageCCXLevel(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${process.env.COURSE_OPERATIONS_API_BASE_URL}/detailed-license-usage/`,
    { params },
  );
}

function getLicenseUsageMCLevel(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-usage/`,
    { params },
  );
}

function getExportLicenseUsageCCXLevel(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${process.env.COURSE_OPERATIONS_API_BASE_URL}/detailed-license-usage-export/`, { params }, { responseType: 'blob' },
  );
}

function getExportLicenseUsageMCLevel(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${process.env.COURSE_OPERATIONS_API_BASE_URL}/license-usage-export/`, { params }, { responseType: 'blob' },
  );
}

export {
  getLicenseUsageCCXLevel,
  getExportLicenseUsageCCXLevel,
  getLicenseUsageMCLevel,
  getExportLicenseUsageMCLevel,
};
