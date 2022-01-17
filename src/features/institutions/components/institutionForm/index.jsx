import React from 'react';
import { Form } from '@edx/paragon';
import PropTypes from 'prop-types';
import { has } from 'lodash';

export const InstitutionForm = ({ fields, setFields, errors }) => {
  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Form.Group isInvalid={has(errors, 'name')}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          maxLength="64"
          value={fields.name}
          onChange={handleInputChange}
        />
        {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group isInvalid={has(errors, 'shortName')}>
        <Form.Label>Short name</Form.Label>
        <Form.Control
          name="shortName"
          maxLength="30"
          value={fields.shortName}
          onChange={handleInputChange}
        />
        {errors.shortName && <Form.Control.Feedback type="invalid">{errors.shortName}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group isInvalid={has(errors, 'name')}>
        <Form.Label>External Id</Form.Label>
        <Form.Control
          name="externalId"
          maxLength="64"
          value={fields.externalId}
          onChange={handleInputChange}
        />
        {errors.externalId && <Form.Control.Feedback type="invalid">{errors.externalId}</Form.Control.Feedback>}
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
    externalId: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
  setFields: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    shortName: PropTypes.string,
    externalId: PropTypes.string,
  }).isRequired,
};
