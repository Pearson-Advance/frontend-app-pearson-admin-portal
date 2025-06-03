import React from 'react';
import PropTypes from 'prop-types';

import DateExtensionForm from 'features/enrollments/components/StudentEnrollmentsPage/components/DateExtensionForm';
import EnrollmentConfirmation from 'features/enrollments/components/StudentEnrollmentsPage/components/EnrollmentConfirmation';

/**
 * ModalBody Component
 *
 * Main container component that conditionally renders either a date extension form
 * or an enrollment confirmation message based on the action type.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isExtendAction - Whether this is a date extension action
 * @param {string} props.extendDate - Current date value (required if isExtendAction is true)
 * @param {Function} props.onDateChange - Date change handler (required if isExtendAction is true)
 * @param {string|null} props.error - Error message for date validation
 * @param {Object} props.selectedRow - Selected learner data (required if isExtendAction is false)
 * @param {string} props.selectedRow.learnerEmail - Learner's email address
 * @param {string} props.selectedRow.ccxName - Course name
 * @param {string} props.status - Enrollment status (required if isExtendAction is false)
 */
const ModalBody = ({
  isExtendAction,
  extendDate,
  onDateChange,
  error,
  selectedRow,
  status,
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
    <EnrollmentConfirmation
      learnerEmail={selectedRow.learnerEmail}
      status={status}
      courseName={selectedRow.ccxName}
    />
  );
};

ModalBody.propTypes = {
  /** Whether this is a date extension action */
  isExtendAction: PropTypes.bool.isRequired,
  /** Current date value (required when isExtendAction is true) */
  extendDate: PropTypes.string,
  /** Date change handler (required when isExtendAction is true) */
  onDateChange: PropTypes.func,
  /** Error message for date validation */
  error: PropTypes.string,
  /** Selected learner data (required when isExtendAction is false) */
  selectedRow: PropTypes.shape({
    /** Learner's email address */
    learnerEmail: PropTypes.string.isRequired,
    /** Course name */
    ccxName: PropTypes.string.isRequired,
  }),
  /** Enrollment status (required when isExtendAction is false) */
  status: PropTypes.oneOf(['enrolled', 'unenrolled']),
};

ModalBody.defaultProps = {
  extendDate: '',
  onDateChange: null,
  error: null,
  selectedRow: null,
  status: null,
};

export default ModalBody;
