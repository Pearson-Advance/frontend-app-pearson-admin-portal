import React from 'react';
import PropTypes from 'prop-types';
import DateExtensionForm from 'features/enrollments/components/StudentEnrollmentsPage/components/DateExtensionForm';
import BulkEnrollmentConfirmation from './BulkEnrollmentConfirmation';

/**
 * Renders the body content for the bulk enrollment action modal.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isExtendAction - Whether the action is extending duration
 * @param {string} props.extendDate - Current date value in YYYY-MM-DD format
 * @param {Function} props.onDateChange - Callback function called when date changes
 * @param {string|null} props.error - Error message to display, null if no error
 * @param {number} props.selectedCount - Number of items selected
 * @param {string} props.statusText - Status text for action feedback
 */
const BulkModalBody = ({
  isExtendAction,
  extendDate,
  onDateChange,
  error,
  selectedCount,
  statusText,
}) => {
  if (isExtendAction) {
    return (
      <DateExtensionForm
        extendDate={extendDate}
        onDateChange={onDateChange}
        error={error}
      />
    );
  }

  return (
    <BulkEnrollmentConfirmation
      selectedCount={selectedCount}
      statusText={statusText}
    />
  );
};

BulkModalBody.propTypes = {
  isExtendAction: PropTypes.bool.isRequired,
  extendDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  selectedCount: PropTypes.number.isRequired,
  statusText: PropTypes.string.isRequired,
};

BulkModalBody.defaultProps = {
  error: null,
};

export default BulkModalBody;
