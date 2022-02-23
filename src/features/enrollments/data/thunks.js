import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getStudentEnrollments, getExportStudentEnrollments, createUnenrollment } from './api';
import {
  fetchStudentEnrollmentsRequest,
  fetchStudentEnrollmentsSuccess,
  fetchStudentEnrollmentsFailed,
  deleteSuccessful,
  deleteFailed,
  unenrollSuccessful,
  // unenrollFailed,
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
 * Export all student enrollments.
 * @returns {(function(*): Promise<void>)|*}
 */
function deleteAction(data) {
  return async (dispatch) => {
    try {
      const response = await createUnenrollment(data);
      dispatch(deleteSuccessful(response.config.data));
    } catch (error) {
      dispatch(deleteFailed());
      logError(error);
    }
  }
};

/**
 * Export all student enrollments.
 * @returns {(function(*): Promise<void>)|*}
 */
 function unenrollAction(data) {
  return async (dispatch) => {
    try {
      const response = await createUnenrollment(data);
      dispatch(unenrollSuccessful(response.data.result));
    } catch (error) {
      logError(error);
    }
  }
};

export {
  fetchStudentEnrollments,
  fetchExportStudentEnrollments,
  deleteAction,
  unenrollAction,
};
