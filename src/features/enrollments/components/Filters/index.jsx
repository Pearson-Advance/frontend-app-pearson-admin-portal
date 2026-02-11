import {
  Card, Col, Form, IconButton, OverlayTrigger, Tooltip,
} from '@openedx/paragon';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { EnrollmentStatus } from 'features/shared/data/constants';
import { faDownload, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Filters = props => {
  const {
    filters,
    setFilters,
    institutions,
    eligibleCourses,
    handleCleanFilters,
    handleApplyFilters,
    handleExportEnrollments,
    isFilterApplied,
    setIsFilterApplied,
  } = props;

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value.trim(),
    });
    setIsFilterApplied(false);
  };

  const handleSelectInstitutionChange = (selected) => {
    setFilters({
      ...filters,
      institution: selected ? selected.value : null,
    });
    setIsFilterApplied(false);
  };

  const handleSelectMasterCourseChange = (selected) => {
    setFilters({
      ...filters,
      masterCourseId: selected ? selected.value : null,
    });
    setIsFilterApplied(false);
  };

  return (
    <Card className="pt-3 mt-3">
      <Form className="row justify-content-center">
        <Form.Group as={Col} controlId="formGridState" className="col col-xl-2 col-lg-4">
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
            value={institutions.find(institution => institution.value === filters.institution) || null}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState" className="col col-xl-2 col-lg-4 col-sm-6">
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
            value={eligibleCourses.find(courses => courses.value === filters.masterCourseId) || null}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity" className="col col-xl-2 col-lg-4 col-sm-6">
          <Form.Control
            name="ccxAdminEmail"
            floatingLabel="CCX admin email"
            value={filters.ccxAdminEmail}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity" className="col col-xl-2 col-lg-4 col-sm-6">
          <Form.Control
            data-testid="learnerEmail"
            name="learnerEmail"
            floatingLabel="Learner email"
            value={filters.learnerEmail}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState" className="col col-xl-2 col-lg-4 col-sm-6">
          <Form.Control
            name="enrollmentStatus"
            floatingLabel="Enrollment status"
            as="select"
            value={filters.enrollmentStatus}
            onChange={handleInputChange}
          >
            <option value="">Choose...</option>
            <option value={EnrollmentStatus.ACTIVE}>{EnrollmentStatus.ACTIVE}</option>
            <option value={EnrollmentStatus.INACTIVE}>{EnrollmentStatus.INACTIVE}</option>
            <option value={EnrollmentStatus.PENDING}>{EnrollmentStatus.PENDING}</option>
            <option value={EnrollmentStatus.EXPIRED}>{EnrollmentStatus.EXPIRED}</option>
          </Form.Control>
        </Form.Group>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip variant="light">Apply filters</Tooltip>}
        >
          <IconButton icon={faSearch} alt="filter" onClick={handleApplyFilters} variant="secondary" />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip variant="light">Clean filters</Tooltip>}
        >
          <IconButton icon={faTrash} alt="filter" onClick={handleCleanFilters} variant="secondary" />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip variant="light">
              {isFilterApplied
                ? 'Export as CSV'
                : 'Apply filters to enable this feature'}
            </Tooltip>
          )}
        >
          <div className="ml-6">
            <IconButton disabled={!isFilterApplied} icon={faDownload} alt="filter" onClick={handleExportEnrollments} variant="secondary" />
          </div>
        </OverlayTrigger>

      </Form>
    </Card>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    institution: PropTypes.string,
    masterCourseId: PropTypes.string,
    learnerEmail: PropTypes.string,
    ccxAdminEmail: PropTypes.string,
    enrollmentStatus: PropTypes.string,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  institutions: PropTypes.arrayOf(PropTypes.shape([])),
  eligibleCourses: PropTypes.arrayOf(PropTypes.shape([])),
  handleCleanFilters: PropTypes.func.isRequired,
  handleApplyFilters: PropTypes.func.isRequired,
  handleExportEnrollments: PropTypes.func.isRequired,
  isFilterApplied: PropTypes.bool.isRequired,
  setIsFilterApplied: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  institutions: [],
  eligibleCourses: [],
};
