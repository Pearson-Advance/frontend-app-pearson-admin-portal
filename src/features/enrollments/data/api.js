import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';

function getStudentEnrollments(filters = null, signal = null) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments/`,
    { params, signal },
  );
}

function getExportStudentEnrollments(filters) {
  let params = {};

  if (filters) {
    params = snakeCaseObject(removeNullOrEmptyObjectAttributes(filters));
  }

  return getAuthenticatedHttpClient().get(
    `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments-export/`,
    { params },
    { responseType: 'blob' },
  );
}

function handleEnrollments(data, courseId) {
  const INSTRUCTOR_API_URL = `${getConfig().LMS_BASE_URL}/courses/course_id/instructor/api`;
  const courseIdSearchPattern = /course_id/;

  return getAuthenticatedHttpClient().post(
    `${INSTRUCTOR_API_URL.replace(courseIdSearchPattern, courseId)}/students_update_enrollment`,
    data,
  );
}

function extendEnrollment(data) {
  const EXTEND_ENROLLMENT_API_URL = `${getConfig().COURSE_OPERATIONS_API_V2_BASE_URL}/extend-enrollment/`;

  return getAuthenticatedHttpClient().post(
    EXTEND_ENROLLMENT_API_URL,
    data,
  );
}

export {
  getStudentEnrollments,
  getExportStudentEnrollments,
  handleEnrollments,
  extendEnrollment,
};
