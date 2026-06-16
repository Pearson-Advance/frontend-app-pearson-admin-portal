import { snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const endpoint = () => `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license/`;
const eligibleCoursesEndpoint = () => `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license-eligible-courses/`;
const ordersEndpoint = () => `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/license-orders/`;

export function getLicenses(selectedInstitution = null, signal = null) {
  const params = {};

  if (selectedInstitution) {
    params.institution_id = selectedInstitution;
  }

  return getAuthenticatedHttpClient().get(endpoint(), { params: { ...params }, signal });
}

export function getLicenseById(id) {
  return getAuthenticatedHttpClient().get(`${endpoint()}${id}/`);
}

export function postLicense(newLicenseData) {
  return getAuthenticatedHttpClient().post(
    endpoint(),
    snakeCaseObject({
      ...newLicenseData,
      institution: { id: newLicenseData.institution },
    }),
  );
}

export function updateLicense(editData) {
  const { licenseId } = editData;
  return getAuthenticatedHttpClient().patch(
    `${endpoint()}${licenseId}/`,
    snakeCaseObject(editData),
  );
}

export function getEligibleCourses(params, signal = null) {
  return getAuthenticatedHttpClient().get(
    eligibleCoursesEndpoint(),
    { params: { ...params }, signal },
  );
}

export function postLicenseOrder(license, orderReference, purchasedSeats, active = true) {
  return getAuthenticatedHttpClient().post(
    ordersEndpoint(),
    snakeCaseObject({
      license, orderReference, purchasedSeats, active,
    }),
  );
}

export function updateLicenseOrder(orderId, orderReference, purchasedSeats) {
  return getAuthenticatedHttpClient().patch(
    `${ordersEndpoint()}${orderId}/`,
    snakeCaseObject({
      orderReference,
      purchasedSeats,
    }),
  );
}

/**
 * Remove (soft-delete) a license order.
 * The backend deactivates the order and responds with 204 No Content.
 * @param {number} orderId - The id of the license order to remove.
 * @returns {Promise} - A promise that resolves with the response of the DELETE request.
 */
export function deleteLicenseOrder(orderId) {
  return getAuthenticatedHttpClient().delete(`${ordersEndpoint()}${orderId}/`);
}

/**
 * Get catalogs.
 * @param {object} - [params] - Optional parameters
 * @param {number} - [params.page] - The page number for page pagination.
 * @returns {Promise} - A promise that resolves with the response of the GET request.
 */

export function getCatalogs(params, signal = null) {
  return getAuthenticatedHttpClient().get(
    `${getConfig().CATALOG_PLUGIN_API_BASE_URL}/flexible-catalogs/`,
    { params, signal },
  );
}
