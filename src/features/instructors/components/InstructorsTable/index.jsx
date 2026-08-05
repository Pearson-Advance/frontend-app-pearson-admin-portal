import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '@openedx/paragon/dist/DataTable';
import { Row, Col } from '@openedx/paragon';
import { PersistController } from 'features/shared/components/PersistController';
import './index.scss';

const InstructorsTable = ({
  data,
  count,
  columns,
  isLoading,
  isError,
}) => {
  const emptyContent = isError
    ? 'An error occurred while loading instructors. Please try again.'
    : 'No instructor data found.';

  return (
    <Row className="enrollments-table-wrapper justify-content-center my-4 border-gray-300 bg-light-100 my-3">
      <Col xs={12}>
        <DataTable
          isSortable
          isLoading={isLoading}
          itemCount={count}
          data={data}
          columns={columns}
        >
          <DataTable.Table />
          <DataTable.EmptyTable content={emptyContent} />
          <DataTable.TableFooter />
          <PersistController />
        </DataTable>
      </Col>
    </Row>
  );
};

InstructorsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  count: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

InstructorsTable.defaultProps = {
  data: [],
  count: 0,
  columns: [],
  isLoading: false,
  isError: false,
};

export { InstructorsTable };
