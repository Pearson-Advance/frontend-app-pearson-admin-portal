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
  INITIAL: 'initial',
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

/**
 * Enum for Tab indexes.
 * @readonly
 * @enum {string}
 */
export const EnrollmentStatus = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  EXPIRED: 'Expired',
};

/**
 * Enum for Data report tabs.
 * @readonly
 * @enum {string}
 */
export const DataReportTab = {
  CCX_LEVEL: 'CCXLevel',
  MC_LEVEL: 'MCLevel',
};

/**
 * Constant for max length in text selector.
 * @readonly
 * @number
 */
export const maxLabelLength = 95;

/**
 * Enum for license types.
 * @readonly
 * @enum {string}
 */
export const LicenseTypes = {
  COURSES: 'courses',
  CATALOG: 'catalog',
};

/**
 * Error messages, keyed by HTTP status, shown when removing a license order fails.
 * @readonly
 * @enum {string}
 */
export const DELETE_ORDER_ERROR_MESSAGES = {
  401: 'Your session has expired. Please sign in again.',
  403: "You don't have permission to remove orders.",
};

/**
 * Fallback error message shown when removing a license order fails
 * with an unmapped HTTP status.
 * @readonly
 * @string
 */
export const GENERIC_DELETE_ORDER_ERROR = 'Something went wrong while removing the order. Please try again.';

/**
 * Number for maximum records in tables.
 * @readonly
 * @number
 */
export const MAX_TABLE_RECORDS = 50;
