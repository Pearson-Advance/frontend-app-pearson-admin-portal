import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Icon, PageBanner } from '@edx/paragon';
import PropTypes from 'prop-types';
import { activeInstitutions } from 'features/institutions/data/selector';
import { has } from 'lodash';
import { WarningFilled } from '@edx/paragon/icons';
import Select from 'react-select';

export const LicenseForm = ({
  created, fields, setFields, errors,
}) => {
  const data = useSelector(activeInstitutions);
  const { eligibleCourses } = useSelector(state => state.licenses);

  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCourseChange = (selected) => {
    setFields({
      ...fields,
      courses: selected.map(course => (course.value)),
    });
  };

  return (
    <>
      {has(errors, 'nonFieldErrors')
        && (
        <Form.Group>
          <PageBanner
            variant="warning"
          >
            <Icon src={WarningFilled} className="mr-2" /> {errors.nonFieldErrors}
          </PageBanner>
        </Form.Group>
        )}
      {created
        && (
        <Form.Group>
          <Form.Control
            name="institution"
            floatingLabel="Institution"
            as="select"
            required
            isInvalid={has(errors, 'institution') && has(errors.institution, 'id')}
            onChange={handleInputChange}
          >
            <option value="">Choose...</option>
            {data.map(institution => <option key={`institution-${institution.id}`} value={institution.id}> {institution.name} </option>)}
          </Form.Control>
          {errors.institution && errors.institution.id && <Form.Control.Feedback type="invalid">{errors.institution.id}</Form.Control.Feedback>}
        </Form.Group>
        )}
      <Form.Group isInvalid={has(errors, 'courses') && has(errors.courses, 'id')} className="mb-3">
        <Select
          isMulti
          options={eligibleCourses}
          value={eligibleCourses.filter(course => fields.courses.includes(course.value))}
          name="courses"
          className="basic-multi-select"
          placeholder="Select Master Courses..."
          minMenuHeight={400}
          onChange={handleSelectCourseChange}
        />
        {errors.courses && errors.courses.id && <Form.Control.Feedback type="invalid">{errors.courses.id}</Form.Control.Feedback>}
      </Form.Group>
      <br />
      {created
        && (
        <Form.Group>
          <Form.Control
            name="courseAccessDuration"
            floatingLabel="Course access duration"
            value={fields.courseAccessDuration}
            onChange={handleInputChange}
          />
          {errors.courseAccessDuration && <Form.Control.Feedback type="invalid">{errors.courseAccessDuration}</Form.Control.Feedback>}
        </Form.Group>
        )}
      <Form.Group>
        <Form.Control
          as="select"
          name="status"
          floatingLabel="Status"
          value={fields.status}
          isInvalid={Object.prototype.hasOwnProperty.call(errors, 'status')}
          onChange={handleInputChange}
        >
          <option value="active">active</option>
          <option value="disabled">disabled</option>
        </Form.Control>
        {errors.status && <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>}
      </Form.Group>
      <br />
    </>
  );
};

LicenseForm.propTypes = {
  created: PropTypes.bool.isRequired,
  fields: PropTypes.shape({
    institution: PropTypes.string,
    courses: PropTypes.array,
    courseAccessDuration: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  setFields: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    institution: PropTypes.shape({
      id: PropTypes.string,
    }),
    courses: PropTypes.shape({
      id: PropTypes.string,
    }),
    courseAccessDuration: PropTypes.number,
    status: PropTypes.string,
    nonFieldErrors: PropTypes.string,
  }).isRequired,
};
