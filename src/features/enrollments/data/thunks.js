import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import { getStudentEnrollments } from './api';
import {
  fetchStudentEnrollmentsRequest,
  fetchStudentEnrollmentsSuccess,
  fetchStudentEnrollmentsFailed,
} from './slices';

/**
 * Fetches all student enrollments.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchStudentEnrollments(filters = null) {
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
