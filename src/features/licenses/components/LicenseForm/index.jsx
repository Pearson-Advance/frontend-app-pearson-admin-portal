import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form, Icon, PageBanner, Spinner, Tooltip, OverlayTrigger,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import { activeInstitutions } from 'features/institutions/data/selector';
import { has } from 'lodash';
import { WarningFilled } from '@edx/paragon/icons';
import { RequestStatus, maxLabelLength } from 'features/shared/data/constants';
import Select, { components } from 'react-select';
import { fetchEligibleCourses } from 'features/licenses/data';
import 'features/licenses/components/LicenseForm/index.scss';

const CustomMultiValue = (props) => {
  const { label } = props.data;

  if (label.length > maxLabelLength) {
    return (
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={(
          <Tooltip>
            {label}
          </Tooltip>
        )}
      >
        <span className="custom-container-selector">
          <components.MultiValueContainer {...props} />
        </span>
      </OverlayTrigger>
    );
  }

  return (
    <components.MultiValueContainer {...props} />
  );
};

export const LicenseForm = ({
  created, fields, setFields, errors,
}) => {
  const dispatch = useDispatch();
  const data = useSelector(activeInstitutions);
  const { eligibleCourses, status } = useSelector(state => state.licenses);
  const licenseBeingEdited = useSelector(state => state.licenses.form.license);
  const isInstitutionSelected = !isNaN(fields.institution) && fields.institution !== ''; // eslint-disable-line no-restricted-globals

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

  const handleFetchEligibleCourses = () => {
    const params = {};

    if (!created) {
      params.license_id = licenseBeingEdited.id;
    } else if (isInstitutionSelected) {
      params.institution_id = fields.institution;
    } else {
      return;
    }

    dispatch(fetchEligibleCourses(params));
  };

  useEffect(() => {
    handleFetchEligibleCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.institution, created]);

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
      <Form.Group isInvalid={has(errors, 'licenseName')}>
        <Form.Label>License Name</Form.Label>
        <Form.Control
          name="licenseName"
          maxLength="255"
          value={fields.licenseName}
          onChange={handleInputChange}
        />
        {errors.licenseName && <Form.Control.Feedback type="invalid">{errors.licenseName}</Form.Control.Feedback>}
      </Form.Group>
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
              data-testid="institution-select"
            >
              <option value="">Choose...</option>
              {data.map(institution => <option key={`institution-${institution.id}`} value={institution.id}> {institution.name} </option>)}
            </Form.Control>
            {errors.institution && errors.institution.id && <Form.Control.Feedback type="invalid">{errors.institution.id}</Form.Control.Feedback>}
          </Form.Group>
        )}
      {(isInstitutionSelected || licenseBeingEdited.id)
        && (
          <Form.Group isInvalid={has(errors, 'courses') && has(errors.courses, 'id')} className="mb-3 mr-2">
            {status !== RequestStatus.IN_PROGRESS
              ? (
                <Select
                  isMulti
                  options={eligibleCourses}
                  value={eligibleCourses.filter(course => fields.courses.includes(course.value))}
                  name="courses"
                  className="basic-multi-select"
                  placeholder="Select Master Courses..."
                  maxMenuHeight={licenseBeingEdited.id ? 150 : 200}
                  onChange={handleSelectCourseChange}
                  components={{ MultiValueContainer: CustomMultiValue }}
                />
              )
              : (
                <Spinner animation="border" className="mie-3" screenReaderText="loading" />
              )}
            {errors.courses && errors.courses.id && <Form.Control.Feedback type="invalid">{errors.courses.id}</Form.Control.Feedback>}
          </Form.Group>
        )}
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
    licenseName: PropTypes.string,
    institution: PropTypes.string,
    courses: PropTypes.instanceOf(Array),
    courseAccessDuration: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  setFields: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    licenseName: PropTypes.string,
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

CustomMultiValue.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
