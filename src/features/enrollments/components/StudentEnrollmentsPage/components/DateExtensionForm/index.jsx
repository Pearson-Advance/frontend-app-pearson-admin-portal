import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@edx/paragon';

/**
 * A form component that allows users to select a new date for extending
 * a learner's enrollment in a course. Includes validation feedback.
 *
 * @param {Object} props - Component props
 * @param {string} props.extendDate - Current date value in YYYY-MM-DD format
 * @param {Function} props.onDateChange - Callback function called when date changes
 * @param {string|null} props.error - Error message to display, null if no error
 */
const DateExtensionForm = ({ extendDate, onDateChange, error }) => (
  <Form.Group controlId="extendDate">
    <Form.Label>Fill new date</Form.Label>
    <Form.Control
      name="date"
      type="date"
      value={extendDate}
      onChange={(e) => onDateChange(e.target.value)}
      isInvalid={!!error}
    />
    {error && (
    <Form.Control.Feedback type="invalid">
      {error}
    </Form.Control.Feedback>
    )}
  </Form.Group>
);

DateExtensionForm.propTypes = {
  /** Current date value in YYYY-MM-DD format */
  extendDate: PropTypes.string.isRequired,
  /** Callback function called when date changes */
  onDateChange: PropTypes.func.isRequired,
  /** Error message to display, null if no error */
  error: PropTypes.string,
};

DateExtensionForm.defaultProps = {
  error: null,
};

export default DateExtensionForm;
