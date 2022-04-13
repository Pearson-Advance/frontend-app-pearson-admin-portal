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

function handleEnrollments(data, courseId) {
  const INSTRUCTOR_API_URL = `${process.env.LMS_BASE_URL}/courses/course_id/instructor/api`;
  const courseIdSearchPattern = /course_id/;

  return getAuthenticatedHttpClient().post(
    `${INSTRUCTOR_API_URL.replace(courseIdSearchPattern, courseId)}/students_update_enrollment`,
    data,
  );
}

export {
  getStudentEnrollments,
  getExportStudentEnrollments,
  handleEnrollments,
};
