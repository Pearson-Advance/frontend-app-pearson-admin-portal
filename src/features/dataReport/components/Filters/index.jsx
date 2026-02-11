import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {
  Card, Col, Form, IconButton, OverlayTrigger, Tooltip,
} from '@openedx/paragon';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Filters = (props) => {
  const {
    filters,
    setFilters,
    eligibleCourses,
    institutions,
    handleCleanFilters,
  } = props;

  const handleSelectInstitutionChange = (selected) => {
    setFilters({
      ...filters,
      institutionId: selected ? selected.value : null,
    });
  };

  const handleSelectMasterCourseChange = (selected) => {
    setFilters({
      ...filters,
      masterCourseId: selected ? selected.value : null,
    });
  };

  return (
    <Card className="pt-3 mt-3">
      <Form className="row justify-content-center">
        <Form.Group as={Col} controlId="formGridState" className="col col-xl-3 col-lg-4 col-sm-6 col-sm-12">
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Institution..."
            isDisabled={false}
            isLoading={false}
            isClearable
            isRtl={false}
            isSearchable
            options={institutions}
            maxMenuHeight={250}
            name="institution"
            onChange={handleSelectInstitutionChange}
            value={institutions.find(institution => institution.value === filters.institutionId) || null}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState" className="col col-xl-3 col-lg-4 col-sm-6 col-sm-12">
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Master Course..."
            isDisabled={false}
            isLoading={false}
            isClearable
            isRtl={false}
            isSearchable
            options={eligibleCourses}
            maxMenuHeight={250}
            name="masterCourseId"
            onChange={handleSelectMasterCourseChange}
            value={eligibleCourses.find(course => course.value === filters.masterCourseId) || null}
          />
        </Form.Group>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip variant="light">Clean filters</Tooltip>}
        >
          <IconButton icon={faTrash} alt="filter" onClick={handleCleanFilters} variant="secondary" />
        </OverlayTrigger>
      </Form>
    </Card>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    institutionId: PropTypes.number,
    masterCourseId: PropTypes.string,
    page: PropTypes.number.isRequired,
  }),
  setFilters: PropTypes.func.isRequired,
  handleCleanFilters: PropTypes.func.isRequired,
  eligibleCourses: PropTypes.arrayOf(PropTypes.shape([])),
  institutions: PropTypes.arrayOf(PropTypes.shape([])),
};

Filters.defaultProps = {
  filters: {
    institutionId: null,
    masterCourseId: null,
    page: 1,
  },
  eligibleCourses: [],
  institutions: [],
};
