import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card, Col, Form, IconButton, OverlayTrigger, Tooltip,
} from '@openedx/paragon';
import Select from 'react-select';
import { Delete, Search } from '@openedx/paragon/icons';
import { INSTRUCTOR_INITIAL_FILTERS_STATE } from 'features/shared/data/constants';

export const Filters = React.memo((props) => {
  const {
    filters,
    setFilters,
    institutions,
    eligibleCourses,
    handleCleanFilters,
    handleApplyFilters,
    setIsFilterApplied,
  } = props;

  const [localFilters, setLocalFilters] = useState({ ...INSTRUCTOR_INITIAL_FILTERS_STATE, ...filters });

  useEffect(() => {
    setLocalFilters({ ...INSTRUCTOR_INITIAL_FILTERS_STATE, ...filters });
  }, [filters]);

  const courseOptions = useMemo(() => {
    if (!eligibleCourses || !eligibleCourses.length) {
      return [];
    }

    return eligibleCourses.map((course) => ({
      value: course.displayName || course.id,
      label: course.displayName || course.label,
    }));
  }, [eligibleCourses]);

  const handleInputChange = (e) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value.trimStart(),
    });
    setIsFilterApplied(false);
  };

  const handleSelectInstitutionChange = (selected) => {
    setLocalFilters({
      ...localFilters,
      institutionId: selected ? selected.value : null,
    });
    setIsFilterApplied(false);
  };

  const handleSelectMasterCourseChange = (selected) => {
    setLocalFilters({
      ...localFilters,
      courseName: selected ? selected.label : null,
    });
    setIsFilterApplied(false);
  };

  const handleActiveChange = (e) => {
    const { value } = e.target;
    let activeValue = '';

    if (value === 'true') {
      activeValue = true;
    } else if (value === 'false') {
      activeValue = false;
    }

    setLocalFilters({
      ...localFilters,
      active: activeValue,
    });
    setIsFilterApplied(false);
  };

  const onApply = () => {
    setFilters(localFilters);
    handleApplyFilters(localFilters);
  };

  const onClean = () => {
    setLocalFilters(INSTRUCTOR_INITIAL_FILTERS_STATE);
    handleCleanFilters();
  };

  return (
    <Card className="pt-3 mt-3">
      <Form>
        <div className="row justify-content-center">
          <Form.Group as={Col} controlId="institutionFilter" className="col col-xl-3 col-lg-4">
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select Institution..."
              isClearable
              isSearchable
              options={institutions}
              maxMenuHeight={250}
              name="institution"
              onChange={handleSelectInstitutionChange}
              value={institutions.find(institution => institution.value === localFilters.institutionId) || null}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="masterCourseFilter" className="col col-xl-3 col-lg-4 col-sm-6">
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select Master Course..."
              isClearable
              isSearchable
              options={courseOptions}
              maxMenuHeight={250}
              name="courseName"
              onChange={handleSelectMasterCourseChange}
              value={courseOptions.find(course => course.label === localFilters.courseName) || null}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="classNameFilter" className="col col-xl-2 col-lg-4 col-sm-6">
            <Form.Control
              name="className"
              floatingLabel="Class Name"
              value={localFilters.className || ''}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="instructorEmailFilter" className="col col-xl-2 col-lg-4 col-sm-6">
            <Form.Control
              name="instructorEmail"
              floatingLabel="Instructor Email"
              value={localFilters.instructorEmail || ''}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="activeFilter" className="col col-xl-2 col-lg-4 col-sm-6">
            <Form.Control
              name="active"
              floatingLabel="Status"
              as="select"
              value={localFilters.active === '' || localFilters.active === null ? '' : String(localFilters.active)}
              onChange={handleActiveChange}
            >
              <option value="">Choose...</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Form.Control>
          </Form.Group>
        </div>

        <div className="row justify-content-center pt-2">
          <div className="row justify-content-center align-items-center pb-3">
            <OverlayTrigger placement="top" overlay={<Tooltip variant="light">Apply filters</Tooltip>}>
              <IconButton
                src={Search}
                alt="Apply filters"
                onClick={onApply}
                variant="secondary"
              />
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip variant="light">Clear filters</Tooltip>}>
              <IconButton
                src={Delete}
                alt="Clear filters"
                onClick={onClean}
                variant="secondary"
              />
            </OverlayTrigger>
          </div>
        </div>
      </Form>
    </Card>
  );
});

Filters.propTypes = {
  filters: PropTypes.shape({
    institutionId: PropTypes.number,
    instructorEmail: PropTypes.string,
    courseName: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
  institutions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
    }),
  ),
  eligibleCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      displayName: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  setFilters: PropTypes.func.isRequired,
  handleCleanFilters: PropTypes.func.isRequired,
  handleApplyFilters: PropTypes.func.isRequired,
  setIsFilterApplied: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  institutions: [],
  eligibleCourses: [],
};
