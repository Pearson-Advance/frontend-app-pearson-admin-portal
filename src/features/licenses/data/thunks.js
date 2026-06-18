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
        return;
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
export function createLicense(newLicenseData) {
  return async (dispatch) => {
    try {
      dispatch(
        postLicenseSuccess(
          camelCaseObject(
            (await postLicense(
              newLicenseData,
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
export function editLicense(editData) {
  return async (dispatch) => {
    try {
      const response = await updateLicense(editData);
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
let abortEligibleCoursesController = null;
export function fetchEligibleCourses(params) {
  return async (dispatch) => {
    if (abortEligibleCoursesController) {
      abortEligibleCoursesController.abort();
    }

    abortEligibleCoursesController = new AbortController();
    const { signal } = abortEligibleCoursesController;

    try {
      dispatch(fetchEligibleCoursesRequest());
      dispatch(
        fetchEligibleCoursesSuccess(
          camelCaseObject((await getEligibleCourses(params, signal)).data),
        ),
      );
    } catch (error) {
      if (signal.aborted) {
        logError('Eligible courses canceled!');
        return;
      }
      dispatch(fetchEligibleCoursesFailed());
      logError(error);
    }
  };
}

export function cancelFetchLicenses() {
  return () => {
    if (abortLicensesController) {
      abortLicensesController.abort();
    }
  };
}

export function cancelFetchEligibleCourses() {
  return () => {
    if (abortEligibleCoursesController) {
      abortEligibleCoursesController.abort();
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
let abortCatalogsController = null;

export function fetchCatalogs() {
  return async (dispatch) => {
    if (abortCatalogsController) {
      abortCatalogsController.abort();
    }
    abortCatalogsController = new AbortController();
    const { signal } = abortCatalogsController;

    dispatch(updateCatalogsRequestStatus(RequestStatus.IN_PROGRESS));

    let page = 1;
    const fetchAllPages = async () => {
      try {
        const response = await getCatalogs({ page }, signal);
        const { results, next: existNextPage } = response.data;
        dispatch(updateCatalogs(results));

        if (existNextPage) {
          page += 1;
          // eslint-disable-next-line no-promise-executor-return
          await new Promise((resolve) => setTimeout(resolve, 200));
          if (signal.aborted) { return; }
          await fetchAllPages();
          return;
        }

        dispatch(updateCatalogsRequestStatus(RequestStatus.SUCCESSFUL));
      } catch (error) {
        if (signal.aborted) {
          logError('Catalogs fetch canceled!');
          return;
        }
        dispatch(updateCatalogsRequestStatus(RequestStatus.FAILED));
        logError(error);
      }
    };

    return fetchAllPages();
  };
}

export function cancelFetchCatalogs() {
  return () => {
    if (abortCatalogsController) {
      abortCatalogsController.abort();
    }
  };
}
