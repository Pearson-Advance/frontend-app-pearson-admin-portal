import { logError } from '@edx/frontend-platform/logging';
import { apiSlice } from 'features/shared/data/apiSlice';
import {
  getExportStudentEnrollments,
  handleEnrollments,
  extendEnrollment,
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

export {
  fetchExportStudentEnrollments,
  updateEnrollmentAction,
  updateEnrollmentDate,
};
