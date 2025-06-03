import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import {
  getStudentEnrollments,
  getExportStudentEnrollments,
  handleEnrollments,
  extendEnrollment,
} from './api';
import {
  fetchStudentEnrollmentsRequest,
  fetchStudentEnrollmentsSuccess,
  fetchStudentEnrollmentsFailed,
  updateEnrollment,
} from './slices';

/**
 * Fetches all student enrollments.
 * @returns {(function(*): Promise<void>)|*}
 */
let abortStudentEnrollmentsController = null;
function fetchStudentEnrollments(filters = null) {
  return async (dispatch) => {
    if (abortStudentEnrollmentsController) {
      abortStudentEnrollmentsController.abort();
    }

    abortStudentEnrollmentsController = new AbortController();
    const { signal } = abortStudentEnrollmentsController;

    try {
      dispatch(fetchStudentEnrollmentsRequest());
      dispatch(fetchStudentEnrollmentsSuccess(camelCaseObject((await getStudentEnrollments(filters, signal)).data)));
    } catch (error) {
      if (signal.aborted) {
        logError('Student enrollments canceled!');
      }

      dispatch(fetchStudentEnrollmentsFailed());
      logError(error);
    }
  };
}

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
function updateEnrollmentAction(data = null, filters = null, courseId = null) {
  return async (dispatch) => {
    try {
      await handleEnrollments(data, courseId);
      dispatch(fetchStudentEnrollmentsRequest());
      dispatch(fetchStudentEnrollmentsSuccess(camelCaseObject((await getStudentEnrollments(filters)).data)));
    } catch (error) {
      logError(error);
    }
  };
}

/**
 * Dispatches an async action to extend a student's enrollment.
 * Handles errors gracefully and optionally triggers a callback on success.
 *
 * @param {FormData|null} data - Form data with enrollment update (e.g., new date).
 * @param {string|null} classId - The ID of the class to update enrollment for.
 * @param {Function|null} callback - Optional callback to execute after success.
 * @returns {Function} A thunk function for Redux dispatch.
 */
function updateEnrollmentDate(data = null, classId = null, callback = null) {
  return async (dispatch) => {
    try {
      await extendEnrollment(data, classId);
      fetchStudentEnrollments();

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
  fetchStudentEnrollments,
  fetchExportStudentEnrollments,
  updateEnrollmentAction,
  updateEnrollmentDate,
};
