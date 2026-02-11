import React from 'react';
import { Form } from '@openedx/paragon';
import { PropTypes } from 'prop-types';
import { has } from 'lodash';

export const LicenseOrderForm = ({ fields, setFields, errors }) => {
  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Form.Group isInvalid={has(errors, 'orderReference')}>
        <Form.Label>Order Reference</Form.Label>
        <Form.Control
          name="orderReference"
          maxLength="64"
          value={fields.orderReference}
          onChange={handleInputChange}
        />
        {errors.orderReference && <Form.Control.Feedback type="invalid">{errors.orderReference}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group isInvalid={has(errors, 'purchasedSeats')}>
        <Form.Label>Purchased Seats</Form.Label>
        <Form.Control
          name="purchasedSeats"
          maxLength="6"
          value={fields.purchasedSeats}
          onChange={handleInputChange}
        />
        {errors.purchasedSeats && <Form.Control.Feedback type="invalid">{errors.purchasedSeats}</Form.Control.Feedback>}
      </Form.Group>
    </>
  );
};

LicenseOrderForm.propTypes = {
  fields: PropTypes.shape({
    orderReference: PropTypes.string,
    purchasedSeats: PropTypes.number,
  }).isRequired,
  setFields: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    orderReference: PropTypes.string,
    purchasedSeats: PropTypes.number,
    nonFieldErrors: PropTypes.string,
  }).isRequired,
};
