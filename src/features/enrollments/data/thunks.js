import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getStudentEnrollments, getExportStudentEnrollments, createUnenrollment, createEnrollment } from './api';
import {
  fetchStudentEnrollmentsRequest,
  fetchStudentEnrollmentsSuccess,
  fetchStudentEnrollmentsFailed,
  deleteSuccessful,
  deleteFailed,
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
function unenrollAction(data) {
  return async (dispatch) => {
    try {
      dispatch(createUnenrollment(data));
    } catch (error) {
      logError(error);
    }
  }
};

// /**
//  * Unenroll student.
//  * @returns {(function(*): Promise<void>)|*}
//  */
// function unenrollAction(filters) {
//   return async (dispatch) => {
//     try {
//       const response = await createUnenrollment(filters);
//       dispatch(fetchStudentEnrollments(response));
//     } catch (error) {
//       // dispatch(unenrollFailed());
//       logError(error);
//     }
//   }
// };

/**
 * Enroll student.
 * @returns {(function(*): Promise<void>)|*}
 */
function enrollAction(data) {
  return async (dispatch) => {
    try {
      dispatch(createEnrollment(data));
    } catch (error) {
      logError(error);
    }
  }
};

export {
  fetchStudentEnrollments,
  fetchExportStudentEnrollments,
  unenrollAction,
  enrollAction,
};
