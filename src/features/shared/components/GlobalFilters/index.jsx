import React, { useMemo } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { TabIndex } from 'features/shared/data/constants';
import { useGetInstitutionsQuery } from 'features/institutions/data/apiSlice';
import { changeGlobalFilters } from 'features/shared/data/slices';
import { Col, Container, Row } from '@openedx/paragon';

export const GlobalFilters = () => {
  const dispatch = useDispatch();
  const selectedInstitution = useSelector(state => state.page.globalFilters.selectedInstitution);
  const tab = useSelector(state => state.page.tab);

  const { data: institutionsData = [] } = useGetInstitutionsQuery();
  const institutions = useMemo(
    () => institutionsData.reduce((filtered, institution) => {
      if (institution.active) {
        filtered.push({ value: institution.id, label: institution.name });
      }

      return filtered;
    }, []),
    [institutionsData],
  );

  const handleSelectInstitutionChange = (selected) => {
    dispatch(changeGlobalFilters(selected ? selected.value : null));
  };

  if (tab === TabIndex.ENROLLMENTS || tab === TabIndex.DATA_REPORT) {
    return null;
  }

  return (
    <Container size="sm" className="py-3">
      <Row>
        <Col className="d-flex justify-content-end align-items-center"><b>Search by Institution:</b></Col>
        <Col>
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select..."
            isDisabled={false}
            isLoading={false}
            isClearable
            isRtl={false}
            isSearchable
            options={institutions}
            maxMenuHeight={250}
            name="institutionsFilter"
            onChange={handleSelectInstitutionChange}
            value={institutions.find(institution => institution.value === selectedInstitution) || null}
          />
        </Col>
      </Row>

    </Container>
  );
};
