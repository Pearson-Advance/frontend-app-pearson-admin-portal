import React, { useEffect } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';

import { fetchInstitutionsForGlobalFilter } from 'features/shared/data/thunks';
import { changeGlobalFilters } from 'features/shared/data/slices';
import { Col, Container, Row } from '@edx/paragon';

export const GlobalFilters = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.page.globalFilters.institutions);

  const handleSelectInstitutionChange = (selected) => {
    dispatch(changeGlobalFilters(selected ? selected.value : null));
  };

  useEffect(() => {
    dispatch(fetchInstitutionsForGlobalFilter());
  }, [dispatch]);

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
            options={data}
            maxMenuHeight={250}
            name="institutionsFilter"
            onChange={handleSelectInstitutionChange}
          />
        </Col>
      </Row>

    </Container>
  );
};
