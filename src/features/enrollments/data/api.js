import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';

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

/**
 * Perform bulk enrollment action (enable/disable/revoke) grouped by course (ccx_id).
 *
 * @param {Array<{learnerEmail: string, ccxId: string}>} enrollments - Selected items.
 * @param {string} action - Action key ('enroll' or 'unenroll').
 * @returns {Promise<Array>} Promises for each course POST request.
 */
function handleBulkEnrollments(enrollments = [], action = '') {
  const groupedByCourse = enrollments.reduce((acc, { learnerEmail, ccxId }) => {
    if (!acc[ccxId]) {
      acc[ccxId] = [];
    }
    acc[ccxId].push(learnerEmail);
    return acc;
  }, {});

  const requests = Object.entries(groupedByCourse).map(([ccxId, emails]) => {
    const formData = new FormData();
    formData.append('identifiers', emails.join(','));
    formData.append('action', action);
    formData.append('auto_enroll', true);
    formData.append('email_students', false);

    if (action === 'unenroll') {
      formData.append('allow_lab_unenroll', true);
    }

    return handleEnrollments(formData, ccxId);
  });

  return Promise.all(requests);
}

/**
 * Perform bulk extend action grouped by course (ccx_id) or handled per item depending on extend API support.
 */
function extendBulkEnrollments(enrollments = [], isoDate = '') {
  return Promise.all(
    enrollments.map(({ learnerEmail, ccxId }) => {
      const formData = new FormData();
      formData.append('date', isoDate);
      formData.append('student_email', learnerEmail);
      formData.append('class_id', ccxId);

      return extendEnrollment(formData);
    }),
  );
}

export {
  getExportStudentEnrollments,
  handleEnrollments,
  extendEnrollment,
  handleBulkEnrollments,
  extendBulkEnrollments,
};
