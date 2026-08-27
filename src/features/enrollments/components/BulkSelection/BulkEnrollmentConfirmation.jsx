import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@openedx/paragon';

/**
 * Displays a confirmation message showing the bulk action that will be
 * performed on selected learners.
 *
 * @param {Object} props - Component props
 * @param {number} props.selectedCount - Number of selected enrollments
 * @param {string} props.statusText - Action status text (e.g., 'unenrolled', 'enrolled', 'revoked')
 * @param {string | null} props.error - Error message to display, null if no error
 */
const BulkEnrollmentConfirmation = ({ selectedCount, statusText, error }) => {
  const preposition = statusText === 'enrolled' ? 'to' : 'from';

  return (
    <>
      <p>
        <b>{selectedCount}</b> selected learner{selectedCount > 1 ? 's' : ''} will be <b>{statusText}</b>{' '}
        {preposition} their respective courses.
      </p>
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
    </>
  );
};

BulkEnrollmentConfirmation.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  statusText: PropTypes.string.isRequired,
  error: PropTypes.string,
};

BulkEnrollmentConfirmation.defaultProps = {
  error: null,
};

export default BulkEnrollmentConfirmation;
