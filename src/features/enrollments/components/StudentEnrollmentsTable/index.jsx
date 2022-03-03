import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '@edx/paragon/dist/DataTable';
import {
  Row, Col,
} from '@edx/paragon';
import { PersistController } from 'features/shared/components/PersistController';

const StudentEnrollmentsTable = ({ data, count, columns }) => (
  <Row className="justify-content-center my-4 border-gray-300 bg-light-100 my-3">
    <Col xs={12}>
      <DataTable
        isSortable
        manualSortBy
        itemCount={count}
        data={data}
        columns={columns}
      >
        <DataTable.Table />
        <DataTable.EmptyTable content="No enrollments found." />
        <DataTable.TableFooter />
        <PersistController />
      </DataTable>
    </Col>
  </Row>
);

StudentEnrollmentsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
  count: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.shape([])),
};

StudentEnrollmentsTable.defaultProps = {
  data: [],
  count: 0,
  columns: [],
};

export { StudentEnrollmentsTable };
