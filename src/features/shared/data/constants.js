import { getConfig } from '@edx/frontend-platform';

export const API_BASE_URL = getConfig().LMS_BASE_URL;

/**
 * Enum for request status.
 * @readonly
 * @enum {string}
 */
export const RequestStatus = {
  IN_PROGRESS: 'in-progress',
  SUCCESSFUL: 'successful',
  FAILED: 'failed',
};

/**
 * Enum for Tab indexes.
 * @readonly
 * @enum {string}
 */
export const TabIndex = {
  INSTITUTIONS: '1',
  ADMINS: '2',
  LICENSES: '3',
  DATA_REPORT: '4',
  ENROLLMENTS: '5',
};
