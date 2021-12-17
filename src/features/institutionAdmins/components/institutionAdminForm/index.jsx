import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@edx/paragon';
import PropTypes from 'prop-types';
import { fetchInstitutions } from 'features/institutions/data';
import { activeInstitutions } from 'features/institutions/data/selector';

export const InstitutionAdminForm = ({ fields, setFields, errors }) => {
  const dispatch = useDispatch();
  const data = useSelector(activeInstitutions);

  useEffect(() => {
    dispatch(fetchInstitutions());
  }, []);

  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Form.Group controlId="formGridState">
        <Form.Control
          name="institutionId"
          floatingLabel="Institution"
          as="select"
          required
          isInvalid={Object.prototype.hasOwnProperty.call(errors, 'institutionId')}
          onChange={handleInputChange}
        >
          <option value="">Choose...</option>
          { data.map(x => <option key={`institution-${x.id}`} value={x.id}> { x.name } </option>) }
        </Form.Control>
        {errors.institutionId && <Form.Control.Feedback type="invalid">{errors.institutionId}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group isInvalid={Object.prototype.hasOwnProperty.call(errors, 'adminEmail')}>
        <Form.Label>Coach email</Form.Label>
        <Form.Control
          name="adminEmail"
          value={fields.adminEmail}
          onChange={handleInputChange}
        />
        {errors.adminEmail && <Form.Control.Feedback type="invalid">{errors.adminEmail}</Form.Control.Feedback>}
      </Form.Group>
    </>
  );
};

InstitutionAdminForm.propTypes = {
  fields: PropTypes.shape({
    institutionId: PropTypes.string,
    adminEmail: PropTypes.string,
  }).isRequired,
  setFields: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    institutionId: PropTypes.string,
    adminEmail: PropTypes.string,
  }).isRequired,
};
