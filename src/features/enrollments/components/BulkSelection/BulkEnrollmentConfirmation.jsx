import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a confirmation message showing the bulk action that will be
 * performed on selected learners.
 *
 * @param {Object} props - Component props
 * @param {number} props.selectedCount - Number of selected enrollments
 * @param {string} props.statusText - Action status text (e.g., 'unenrolled', 'enrolled', 'revoked')
 */
const BulkEnrollmentConfirmation = ({ selectedCount, statusText }) => {
  const preposition = statusText === 'enrolled' ? 'to' : 'from';

  return (
    <p>
      <b>{selectedCount}</b> selected learner{selectedCount > 1 ? 's' : ''} will be <b>{statusText}</b>{' '}
      {preposition} their respective courses.
    </p>
  );
};

BulkEnrollmentConfirmation.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  statusText: PropTypes.string.isRequired,
};

export default BulkEnrollmentConfirmation;
