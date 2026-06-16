import { DELETE_ORDER_ERROR_MESSAGES, GENERIC_DELETE_ORDER_ERROR } from 'features/shared/data/constants';

/**
 * Return a user-facing error message for a failed license order deletion,
 * based on the HTTP status of the response.
 * @param {number} status HTTP status code of the failed request.
 * @returns {string} Error message to show to the user.
 */
export function getDeleteOrderErrorMessage(status) {
  return DELETE_ORDER_ERROR_MESSAGES[status] || GENERIC_DELETE_ORDER_ERROR;
}

export function removeNullOrEmptyObjectAttributes(object) {
  return Object.keys(object)
    .filter((key) => object[key] !== null && object[key] !== '')
    .reduce((arr, key) => ({ ...arr, [key]: object[key] }), {});
}

/**
 * Return the ordering parameter value in snake_case with its
 * correspondig ascenging/descending indication.
 * @param  {[array]} sortBy Table's sortBy information.
 * @returns {string} ordering parameter value for to be used in a request to the backend.
 */
export function getOrdering(sortByObject) {
  let orderingParam;

  if (sortByObject && sortByObject.length) {
    orderingParam = (sortByObject[0].desc ? '-' : '');
    orderingParam += sortByObject[0].id;
    orderingParam = orderingParam.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  return orderingParam;
}
