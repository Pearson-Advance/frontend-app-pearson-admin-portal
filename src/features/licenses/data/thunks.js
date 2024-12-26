import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import {
  getLicenses, getLicenseById, postLicense, getEligibleCourses,
  postLicenseOrder, updateLicenseOrder, updateLicense, getCatalogs,
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
  patchLicenseSuccess,
  patchLicenseFailed,
  fetchEligibleCoursesRequest,
  fetchEligibleCoursesSuccess,
  fetchEligibleCoursesFailed,
  postLicenseOrderSuccess,
  postLicenseOrderFailed,
  patchLicenseOrderSuccess,
  patchLicenseOrderFailed,
  updateCatalogs,
  updateCatalogsRequestStatus,
} from './slices';
import { RequestStatus } from '../../shared/data/constants';

/**
 * Fetches all licenses.
 * @returns {(function(*): Promise<void>)|*}
 */
let abortLicensesController = null;
export function fetchLicenses(selectedInstitution = null) {
  return async (dispatch) => {
    if (abortLicensesController) {
      abortLicensesController.abort();
    }

    abortLicensesController = new AbortController();
    const { signal } = abortLicensesController;

    try {
      dispatch(fetchLicensesRequest());
      const response = await getLicenses(selectedInstitution, signal);
      dispatch(fetchLicensesSuccess(camelCaseObject(response.data)));
    } catch (error) {
      if (signal.aborted) {
        logError('Licenses canceled!');
      }

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
export function createLicense(licenseName, institution, courses, courseAccessDuration, status, catalogs) {
  return async (dispatch) => {
    try {
      dispatch(
        postLicenseSuccess(
          camelCaseObject(
            (await postLicense(
              licenseName,
              institution,
              courses,
              courseAccessDuration,
              status,
              catalogs,
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
 * Edit License.
 * @returns {(function(*): Promise<void>)|*}
 */
export function editLicense(licenseName, licenseId, status, courses) {
  return async (dispatch) => {
    try {
      const response = await updateLicense(
        licenseName,
        licenseId,
        status,
        courses,
      );
      dispatch(patchLicenseSuccess(camelCaseObject(response.data)));
    } catch (error) {
      dispatch(patchLicenseFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}

/**
 * Fetches all license managed courses.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchEligibleCourses(params) {
  return async (dispatch) => {
    try {
      dispatch(fetchEligibleCoursesRequest());
      dispatch(
        fetchEligibleCoursesSuccess(
          camelCaseObject((await getEligibleCourses(params)).data),
        ),
      );
    } catch (error) {
      dispatch(fetchEligibleCoursesFailed());
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

/**
 * Edit LicenseOrder.
 * @returns {(function(*): Promise<void>)|*}
 */
export function editLicenseOrder(orderId, orderReference, purchasedSeats) {
  return async (dispatch) => {
    try {
      const response = await updateLicenseOrder(
        orderId,
        orderReference,
        purchasedSeats,
      );
      dispatch(patchLicenseOrderSuccess(camelCaseObject(response.data)));
    } catch (error) {
      dispatch(patchLicenseOrderFailed(camelCaseObject(error.response.data)));
      logError(error);
    }
  };
}

/**
 * Fetch all catalogs.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchCatalogs() {
  return async (dispatch) => {
    dispatch(updateCatalogsRequestStatus(RequestStatus.IN_PROGRESS));

    let page = 1;
    const fetchAllPages = async () => {
      try {
        const response = await getCatalogs({ page });
        const { results, next: existNextPage } = response.data;
        dispatch(updateCatalogs(results));

        if (existNextPage) {
          page += 1;
          // eslint-disable-next-line no-promise-executor-return
          await new Promise((resolve) => setTimeout(resolve, 200));
          return fetchAllPages();
        }

        dispatch(updateCatalogsRequestStatus(RequestStatus.SUCCESSFUL));
        return results;
      } catch (error) {
        dispatch(updateCatalogsRequestStatus(RequestStatus.FAILED));
        return logError(error);
      }
    };

    return fetchAllPages();
  };
}
