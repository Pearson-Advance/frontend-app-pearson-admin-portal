import React from 'react';
import { Form } from '@edx/paragon';
import PropTypes from 'prop-types';

export const InstitutionForm = ({ fields, setFields, errors }) => {
  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Form.Group isInvalid={Object.prototype.hasOwnProperty.call(errors, 'name')}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          maxLength="64"
          value={fields.name}
          onChange={handleInputChange}
        />
        {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group isInvalid={Object.prototype.hasOwnProperty.call(errors, 'short_name')}>
        <Form.Label>Short name</Form.Label>
        <Form.Control
          name="shortName"
          maxLength="20"
          value={fields.shortName}
          onChange={handleInputChange}
        />
        {errors.short_name && <Form.Control.Feedback type="invalid">{errors.short_name}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group>
        <Form.Checkbox
          name="active"
          checked={fields.active}
          onChange={() => setFields({ ...fields, active: !fields.active })}
        >
          Active
        </Form.Checkbox>
      </Form.Group>
    </>
  );
};

InstitutionForm.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
    shortName: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
  setFields: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    short_name: PropTypes.string,
  }).isRequired,
};
