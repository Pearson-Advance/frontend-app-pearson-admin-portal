import { logError } from '@edx/frontend-platform/logging';
import { apiSlice } from 'features/shared/data/apiSlice';
import {
  getExportStudentEnrollments,
  handleEnrollments,
  extendEnrollment,
  handleBulkEnrollments,
  extendBulkEnrollments,
} from './api';
import {
  updateEnrollment,
} from './slices';

/**
 * Export all student enrollments.
 * @returns {(function(*): Promise<void>)|*}
 */
function fetchExportStudentEnrollments(filters) {
  return async () => {
    try {
      const response = await getExportStudentEnrollments(filters);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response.data]));

      link.setAttribute('download', `enrollments_${(new Date().toISOString().toString())}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      logError(error);
    }
  };
}

/**
 * Delete and Unenroll student enrollment.
 * @returns {(function(*): Promise<void>)|*}
 */
function updateEnrollmentAction(data = null, courseId = null) {
  return async (dispatch) => {
    try {
      await handleEnrollments(data, courseId);
      dispatch(apiSlice.util.invalidateTags(['Enrollments']));
    } catch (error) {
      logError(error);
    }
  };
}

/**
 * Dispatches an async action to extend a student's enrollment.
 * Handles errors gracefully and optionally triggers a callback on success.
 *
 * @param {FormData|null} data - Form data with the enrollment update, including the class id.
 * @param {Function|null} callback - Optional callback to execute after success.
 * @returns {Function} A thunk function for Redux dispatch.
 */
function updateEnrollmentDate(data = null, callback = null) {
  return async (dispatch) => {
    try {
      await extendEnrollment(data);
      dispatch(apiSlice.util.invalidateTags(['Enrollments']));

      if (typeof callback === 'function') {
        callback();
      }
    } catch (error) {
      let errorMessage = 'An unknown error occurred.';

      const parsed = JSON.parse(error?.customAttributes?.httpErrorResponseData || '{}');
      const flattened = Object.values(parsed).flat();

      if (flattened.length) {
        errorMessage = flattened.join(', ');
        logError(error);
        dispatch(updateEnrollment({ errorMessage }));
        return;
      }

      logError(error);
      dispatch(updateEnrollment({ errorMessage }));
    }
  };
}

/**
 * Dispatches async action to execute bulk actions on selected enrollments.
 *
 * @param {Object} payload - { action, enrollments, date }
 * @returns {Function} Redux thunk function.
 */
function updateBulkEnrollmentsAction(payload = {}) {
  return async (dispatch) => {
    const { action, enrollments = [], date } = payload;
    const errors = [];

    try {
      const apiAction = action === 'enable' ? 'enroll' : 'unenroll';
      const settledResults = action === 'extend'
        ? await extendBulkEnrollments(enrollments, date)
        : await handleBulkEnrollments(enrollments, apiAction);

      settledResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          const itemResults = result.value?.data?.results || [];
          itemResults.forEach((item) => {
            if (item.error) {
              errors.push(`${item.identifier}: ${item.message}`);
            }
          });
        } else if (result.status === 'rejected') {
          const errorResponse = result.reason?.customAttributes?.httpErrorResponseData;
          let errorMessage = 'An error occurred while executing the bulk action.';

          if (errorResponse) {
            try {
              const parsed = JSON.parse(errorResponse);
              const flattened = Object.values(parsed).flat();
              if (flattened.length) {
                errorMessage = flattened.join(', ');
              }
            } catch (error) {
              logError(error);
            }
          }

          errors.push(errorMessage);
        }
      });

      dispatch(apiSlice.util.invalidateTags(['Enrollments']));

      if (errors.length > 0) {
        const fullErrorMessage = errors.join(' | ');
        dispatch(updateEnrollment({ errorMessage: fullErrorMessage }));
        throw new Error(fullErrorMessage);
      }
    } catch (error) {
      logError(error);
      dispatch(updateEnrollment({ errorMessage: 'An error occurred while executing the bulk action.' }));
      throw error;
    }
  };
}

export {
  fetchExportStudentEnrollments,
  updateEnrollmentAction,
  updateEnrollmentDate,
  updateBulkEnrollmentsAction,
};
