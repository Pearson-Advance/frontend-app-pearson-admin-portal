import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { snakeCaseObject } from '@edx/frontend-platform';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';

function getStudentEnrollments(filters = null) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${process.env.COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments/`, { params },
  );
}

function getExportStudentEnrollments(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${process.env.COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments-export/`, { params }, { responseType: 'blob' },
  );
}

function createUnenrollment(data) {
  return getAuthenticatedHttpClient().post(
    `${process.env.ENROLLMENT_API_BASE_URL}/unenrollment`, data);
}

export {
  getStudentEnrollments,
  getExportStudentEnrollments,
  createUnenrollment,
};
