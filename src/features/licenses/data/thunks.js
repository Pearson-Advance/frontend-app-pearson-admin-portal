import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import {
  getLicenses, getLicenseById, postLicense, getLicenseManageCourses,
  postLicenseOrder,
} from './api';
import {
  fetchLicensesRequest,
  fetchLicensesSuccess,
  fetchLicensesFailed,
  fetchLicenseRequest,
  fetchLicenseSuccess,
  fetchLicenseFailed,
  postLicenseSuccess,
  postLicenseFailed,
  fetchLicenseManageCoursesRequest,
  fetchLicenseManageCoursesSuccess,
  fetchLicenseManageCoursesFailed,
  postLicenseOrderSuccess,
  postLicenseOrderFailed,
} from './slices';

/**
 * Fetches all licenses.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchLicenses() {
  return async (dispatch) => {
    try {
      dispatch(fetchLicensesRequest());
      dispatch(fetchLicensesSuccess(camelCaseObject((await getLicenses()).data)));
    } catch (error) {
      dispatch(fetchLicensesFailed());
      logError(error);
    }
  };
}

/**
 * Fetches a license by id.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchLicensebyId(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchLicenseRequest());
      dispatch(fetchLicenseSuccess(camelCaseObject((await getLicenseById(id)).data)));
    } catch (error) {
      dispatch(fetchLicenseFailed());
    }
  };
}

/** Post License creation.
 * @returns {(function(*): Promise<void>)|*}
 */
export function createLicense(institution, course, courseAccessDuration, status) {
  return async (dispatch) => {
    try {
      dispatch(
        postLicenseSuccess(
          camelCaseObject(
            (await postLicense(
              institution,
              course,
              courseAccessDuration,
              status,
            )).data,
          ),
        ),
      );
    } catch (error) {
      dispatch(postLicenseFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}

/**
 * Fetches all license managed courses.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchLicenseManageCourses(url) {
  return async (dispatch) => {
    try {
      dispatch(fetchLicenseManageCoursesRequest());
      dispatch(
        fetchLicenseManageCoursesSuccess(
          camelCaseObject((await getLicenseManageCourses(url)).data),
        ),
      );
    } catch (error) {
      dispatch(fetchLicenseManageCoursesFailed());
      logError(error);
    }
  };
}

/**
 * Post LicenseOrder Creation.
 * @returns {(function(*): Promise<void>)|*}
 */
export function createLicenseOrder(license, orderReference, purchasedSeats, active) {
  return async (dispatch) => {
    try {
      dispatch(postLicenseOrderSuccess(camelCaseObject((await postLicenseOrder(
        license,
        orderReference,
        purchasedSeats,
        active,
      )).data)));
    } catch (error) {
      dispatch(postLicenseOrderFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}
