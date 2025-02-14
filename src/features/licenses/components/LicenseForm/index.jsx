import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form,
  Icon,
  PageBanner,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from '@edx/paragon';
import { has } from 'lodash';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { getConfig } from '@edx/frontend-platform';
import { WarningFilled } from '@edx/paragon/icons';

import { fetchEligibleCourses } from 'features/licenses/data';
import { RequestStatus, maxLabelLength, LicenseTypes } from 'features/shared/data/constants';
import { activeInstitutions } from 'features/institutions/data/selector';

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

const selectorOptions = {
  courses: 'courses',
  catalogs: 'catalogs',
};

export const LicenseForm = ({
  created, fields, setFields, errors,
}) => {
  const dispatch = useDispatch();
  const data = useSelector(activeInstitutions);
  const { eligibleCourses, status: courseStatus, catalogs } = useSelector(state => state.licenses);
  const { data: catalogsList, status: catalogStatus } = catalogs;
  const licenseBeingEdited = useSelector(state => state.licenses.form.license);
  const isInstitutionSelected = !Number.isNaN(fields.institution) && fields.institution !== '';

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCatalogs, setSelectedCatalogs] = useState([]);
  const [optionSelection, setOptionSelection] = useState(created ? selectorOptions.courses : '');

  const showCatalogSelector = getConfig().SHOW_CATALOG_SELECTOR || false;

  const handleInputChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (option) => {
    const resetFields = {
      courses: () => {
        setSelectedCatalogs([]);
        setFields({ ...fields, catalogs: [], licenseType: LicenseTypes.COURSES });
      },
      catalogs: () => {
        setSelectedCourses([]);
        setFields({ ...fields, courses: [], licenseType: LicenseTypes.CATALOG });
      },
    };

    resetFields[option]?.();

    setOptionSelection(option);
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

  useEffect(() => {
    const filteredCourses = eligibleCourses.filter(course => fields.courses.includes(course.value));
    const filteredCatalogs = catalogsList.filter(catalog => fields.catalogs.includes(catalog.value));

    setSelectedCourses(filteredCourses);
    setSelectedCatalogs(filteredCatalogs);
  }, [fields.courses, fields.catalogs, eligibleCourses, catalogsList]);

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
          <>
            {
              (created && showCatalogSelector) && (
                <Form.Group>
                  <Form.RadioSet
                    name="option-selector"
                    onChange={(e) => handleOptionChange(e.target.value)}
                    defaultValue={optionSelection}
                    isInline
                  >
                    <Form.Radio value="courses">Master Courses</Form.Radio>
                    <Form.Radio value="catalogs">Catalogs</Form.Radio>
                  </Form.RadioSet>
                </Form.Group>
              )
            }
            <Form.Group isInvalid={has(errors, 'courses') && has(errors.courses, 'id')} className="mb-3 mr-2">
              {courseStatus !== RequestStatus.IN_PROGRESS || catalogStatus !== RequestStatus.IN_PROGRESS
                ? (
                  <>
                    {!created && fields.licenseType === LicenseTypes.COURSES && (
                      <Form.Label>Master Courses</Form.Label>
                    )}
                    {(selectedCourses.length > 0 || optionSelection === selectorOptions.courses) && (
                      <Select
                        isMulti
                        options={eligibleCourses}
                        value={selectedCourses}
                        name="courses"
                        className="basic-multi-select mb-3"
                        placeholder="Select Master Courses..."
                        maxMenuHeight={licenseBeingEdited.id ? 150 : 200}
                        onChange={handleSelectCourseChange}
                        components={{ MultiValueContainer: CustomMultiValue }}
                      />
                    )}
                    {!created && fields.licenseType === LicenseTypes.CATALOG && (
                      <Form.Label>Catalogs</Form.Label>
                    )}
                    {(selectedCatalogs.length > 0 || optionSelection === selectorOptions.catalogs) && (
                      <Select
                        isMulti
                        options={catalogsList}
                        value={selectedCatalogs}
                        name="catalogs"
                        className="basic-multi-select"
                        placeholder="Select Catalog"
                        onChange={option => setFields({
                          ...fields,
                          catalogs: option.map(catalog => (catalog.value)),
                        })}
                        components={{ MultiValueContainer: CustomMultiValue }}
                      />
                    )}
                  </>
                )
                : (
                  <Spinner animation="border" className="mie-3" screenReaderText="loading" />
                )}
              {errors.courses && errors.courses.id && <Form.Control.Feedback type="invalid">{errors.courses.id}</Form.Control.Feedback>}
            </Form.Group>
          </>
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
    catalogs: PropTypes.instanceOf(Array),
    licenseType: PropTypes.string,
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
