import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {
  Card, Col, Form, IconButton, OverlayTrigger, Tooltip,
} from '@openedx/paragon';
import { Delete } from '@openedx/paragon/icons';
import { DataReportTab } from 'features/shared/data/constants';
import { useDebounce } from 'features/shared/hooks/useDebounce';

export const Filters = (props) => {
  const {
    filters,
    setFilters,
    eligibleCourses,
    institutions,
    handleCleanFilters,
    dataReportTab,
  } = props;

  const isCCXLevel = dataReportTab === DataReportTab.CCX_LEVEL;

  // Local state keeps the text inputs responsive; the debounced values are what
  // actually update the shared filters (and trigger the report fetch).
  const [ccxName, setCcxName] = useState(filters.ccxName || '');
  const [ccxId, setCcxId] = useState(filters.ccxId || '');

  const debouncedCcxName = useDebounce(ccxName);
  const debouncedCcxId = useDebounce(ccxId);

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

  // Propagate the debounced text inputs to the shared filters.
  useEffect(() => {
    const trimmedCcxName = debouncedCcxName.trim();
    const trimmedCcxId = debouncedCcxId.trim();

    setFilters((prevFilters) => {
      if (prevFilters.ccxName === trimmedCcxName && prevFilters.ccxId === trimmedCcxId) {
        return prevFilters;
      }
      return { ...prevFilters, ccxName: trimmedCcxName, ccxId: trimmedCcxId };
    });
  }, [debouncedCcxName, debouncedCcxId, setFilters]);

  // Keep local inputs in sync when filters are reset externally
  // (Clean filters button or switching to the MC level tab).
  useEffect(() => {
    setCcxName(filters.ccxName || '');
    setCcxId(filters.ccxId || '');
  }, [filters.ccxName, filters.ccxId]);

  return (
    <Card className="pt-3 mt-3">
      <Form>
        <div className="row justify-content-center">
          <div className="col-12 col-xl-8 d-flex align-items-center">
            <div className="flex-grow-1">
              <div className="row">
                <Form.Group as={Col} controlId="formGridState" className="col-12 col-md-6">
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

                <Form.Group as={Col} controlId="formGridState" className="col-12 col-md-6">
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
              </div>

              {isCCXLevel && (
                <div className="row pt-3">
                  <Form.Group as={Col} controlId="formGridCcxName" className="col-12 col-md-6">
                    <Form.Control
                      data-testid="ccxName"
                      name="ccxName"
                      floatingLabel="CCX Name"
                      value={ccxName}
                      onChange={e => setCcxName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCcxId" className="col-12 col-md-6">
                    <Form.Control
                      data-testid="ccxId"
                      name="ccxId"
                      floatingLabel="CCX ID"
                      value={ccxId}
                      onChange={e => setCcxId(e.target.value)}
                    />
                  </Form.Group>
                </div>
              )}
            </div>

            <OverlayTrigger
              placement="top"
              overlay={<Tooltip variant="light">Clean filters</Tooltip>}
            >
              <IconButton
                className="ml-2"
                src={Delete}
                alt="Clear filters"
                onClick={handleCleanFilters}
                variant="secondary"
              />
            </OverlayTrigger>
          </div>
        </div>
      </Form>
    </Card>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({
    institutionId: PropTypes.number,
    masterCourseId: PropTypes.string,
    ccxName: PropTypes.string,
    ccxId: PropTypes.string,
    page: PropTypes.number.isRequired,
  }),
  setFilters: PropTypes.func.isRequired,
  handleCleanFilters: PropTypes.func.isRequired,
  eligibleCourses: PropTypes.arrayOf(PropTypes.shape([])),
  institutions: PropTypes.arrayOf(PropTypes.shape([])),
  dataReportTab: PropTypes.string,
};

Filters.defaultProps = {
  filters: {
    institutionId: null,
    masterCourseId: null,
    ccxName: '',
    ccxId: '',
    page: 1,
  },
  eligibleCourses: [],
  institutions: [],
  dataReportTab: DataReportTab.CCX_LEVEL,
};
