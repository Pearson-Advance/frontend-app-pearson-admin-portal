import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '@openedx/paragon/dist/DataTable';
import {
  Row, Col,
} from '@openedx/paragon';
import { PersistController } from 'features/shared/components/PersistController';
import './index.scss';

const StudentEnrollmentsTable = React.memo(({
  data,
  count,
  columns,
  hideColumns,
  isLoading,
  hasActiveFilters,
  isError,
}) => {
  let emptyContent = 'No enrollments found.';

  if (isError) {
    emptyContent = 'An error occurred while loading enrollments. Please try again.';
  } else if (!hasActiveFilters) {
    emptyContent = 'Set your filters and click search to view the results.';
  }

  return (
    <Row className="enrollments-table-wrapper justify-content-center my-4 border-gray-300 bg-light-100 my-3">
      <Col xs={12}>
        <DataTable
          isSortable
          manualSortBy
          isLoading={isLoading}
          itemCount={count}
          data={data}
          columns={columns}
          initialState={hideColumns}
        >
          <DataTable.Table />
          <DataTable.EmptyTable content={emptyContent} />
          <DataTable.TableFooter />
          <PersistController />
        </DataTable>
      </Col>
    </Row>
  );
});

StudentEnrollmentsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
  count: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.shape([])),
  hideColumns: PropTypes.oneOfType({}),
  isLoading: PropTypes.bool,
  hasActiveFilters: PropTypes.bool,
  isError: PropTypes.bool,
};

StudentEnrollmentsTable.defaultProps = {
  data: [],
  count: 0,
  columns: [],
  hideColumns: {},
  isLoading: false,
  hasActiveFilters: false,
  isError: false,
};

export { StudentEnrollmentsTable };
