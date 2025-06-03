import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a confirmation message showing the enrollment action that will be
 * performed on a learner. Shows the learner's email, action (enrolled/unenrolled),
 * and the course name.
 *
 * @param {Object} props - Component props
 * @param {string} props.learnerEmail - Email address of the learner
 * @param {string} props.status - Enrollment status
 * @param {string} props.courseName - Name of the course
 */
const EnrollmentConfirmation = ({ learnerEmail, status, courseName }) => {
  const actionText = status === 'enrolled' ? 'to' : 'from';

  return (
    <p>
      Learner with email <b>{learnerEmail}</b> will be <b>{status}</b>{' '}
      {actionText} <b>{courseName}</b> course.
    </p>
  );
};

EnrollmentConfirmation.propTypes = {
  /** Email address of the learner */
  learnerEmail: PropTypes.string.isRequired,
  /** Enrollment status - determines the action being performed */
  status: PropTypes.oneOf(['enrolled', 'unenrolled']).isRequired,
  /** Name of the course */
  courseName: PropTypes.string.isRequired,
};

export default EnrollmentConfirmation;
