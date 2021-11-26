/**
 * Get HTTP Error status from generic error.
 * @param error Generic caught error.
 * @returns {number|undefined}
 */
export const getHttpErrorStatus = error => error && error.customAttributes && error.customAttributes.httpErrorStatus;
