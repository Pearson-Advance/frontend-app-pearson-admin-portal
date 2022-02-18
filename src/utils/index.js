/**
 * This helper function makes HTTP error responses user-friendly.
 * @param {object} Error response.
 * @returns {String} Properly formatted error message.
 * @example
 * example 1:
 * {"developer_message": "User matching query does not exist."}
 *
 * example 2:
 * {
 *    "field_errors": {
 *      "is_active": {
 *          "developer_message": "Is active filter should not be used alone. Please add at least one more filter."
*        }
 *    }
 * }
 */
const getErrorMessages = (error) => {
    // Form validation from DRF, comes back as an object of fields: errors.
    if (error.response && error.response.data) {
      const errorMessage = error.response.data;
  
      if (!errorMessage.field_errors)
        return error.response.data.developer_message;
  
      // For multiple field errors.
      return Object.keys(errorMessage.field_errors).map(
        key => `${errorMessage.field_errors[key].developer_message}`,
      );
    }
  
    // For generic HTTP errors like 500, 404 that does not contain field validation error messages.
    return error.message;
  };
  
  export { getErrorMessages };
