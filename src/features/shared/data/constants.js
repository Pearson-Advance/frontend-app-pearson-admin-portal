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
  INSTRUCTORS: '3',
  LICENSES: '4',
  DATA_REPORT: '5',
  ENROLLMENTS: '6',
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

/**
 * Default initial state for the instructor filters form.
 * @type {Object}
 * @property {string|null} institutionId - Selected institution ID for filtering.
 * @property {string|null} courseName - Selected master course display name for filtering.
 * @property {string} instructorEmail - Instructor email address or partial email search term.
 * @property {boolean|string} active - Instructor status flag (true: active, false: inactive, '': all).
 */
export const INSTRUCTOR_INITIAL_FILTERS_STATE = {
  institutionId: null,
  courseName: null,
  instructorEmail: '',
  active: '',
};
