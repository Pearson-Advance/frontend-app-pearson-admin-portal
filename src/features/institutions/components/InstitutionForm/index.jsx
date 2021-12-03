import React from 'react';
import { Form } from '@edx/paragon';

export const InstitutionForm = ({ fields, setFields, errors }) => {
  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Form.Group isInvalid={errors.hasOwnProperty('name')}>
        <Form.Label>name</Form.Label>
        <Form.Control
          name="name"
          maxLength="25"
          value={fields.name}
          onChange={handleInputChange}
        />
        {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group isInvalid={errors.hasOwnProperty('shortName')}>
        <Form.Label>short name</Form.Label>
        <Form.Control
          name="shortName"
          maxLength="5"
          value={fields.shortName}
          onChange={handleInputChange}
        />
        {errors.shortName && <Form.Control.Feedback type="invalid">{errors.shortName}</Form.Control.Feedback>}
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
