import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import {
  getStudentEnrollments,
  getExportStudentEnrollments,
  handleEnrollments,
} from './api';
import {
  fetchStudentEnrollmentsRequest,
  fetchStudentEnrollmentsSuccess,
  fetchStudentEnrollmentsFailed,
} from './slices';

/**
 * Fetches all student enrollments.
 * @returns {(function(*): Promise<void>)|*}
 */
function fetchStudentEnrollments(filters = null) {
  return async (dispatch) => {
    try {
      dispatch(fetchStudentEnrollmentsRequest());
      dispatch(fetchStudentEnrollmentsSuccess(camelCaseObject((await getStudentEnrollments(filters)).data)));
    } catch (error) {
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

export {
  fetchStudentEnrollments,
  fetchExportStudentEnrollments,
  updateEnrollmentAction,
};
