import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '@edx/paragon/dist/DataTable';
import { Row, Col, TextFilter } from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { openModalForm } from 'features/institutions/data/slices';
import { PersistController } from 'features/shared/components/PersistController';
import { getColumns } from './columns';

const InstitutionsTable = ({ data }) => {
  const dispatch = useDispatch();
  const {
    pageSize, pageIndex, filters, sortBy,
  } = useSelector(state => state.page.dataTable);

  const handleEditModal = (id, name, shortName, active) => {
    dispatch(openModalForm({
      id, name, shortName, active,
    }));
  };

  const COLUMNS = getColumns({ handleEditModal });

  return (
    <Row className="justify-content-center my-4 border-gray-300 bg-light-100 my-3">
      <Col xs={12}>
        <DataTable
          isSortable
          isPaginated
          isFilterable
          showFiltersInSidebar
          defaultColumnValues={{ Filter: TextFilter }}
          initialState={{
            pageSize, pageIndex, filters: JSON.parse(filters), sortBy,
          }}
          itemCount={data.length}
          data={data}
          columns={COLUMNS}
        >
          <DataTable.Table />
          <DataTable.EmptyTable content="No results found." />
          <DataTable.TableFooter />
          <PersistController />
        </DataTable>
      </Col>
    </Row>
  );
};

InstitutionsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

InstitutionsTable.defaultProps = {
  data: [],
};

export { InstitutionsTable };
