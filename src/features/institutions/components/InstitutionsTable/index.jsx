import React from 'react';
import PropTypes from 'prop-types';
import DataTable from '@edx/paragon/dist/DataTable';
import { Row, Col } from '@edx/paragon';
import { COLUMNS } from './columns';

const InstitutionsTable = ({ data }) => (
  <Row className="justify-content-center my-4 border-gray-300 bg-light-100 my-3">
    <Col xs={12}>
      <DataTable
        isSortable
        isPaginated
        initialState={{
          pageSize: 10,
          pageIndex: 0,
        }}
        itemCount={data.length}
        data={data}
        columns={COLUMNS}
      >
        <DataTable.Table />
        <DataTable.EmptyTable content="No results found." />
        <DataTable.TableFooter />
      </DataTable>
    </Col>
  </Row>
);

InstitutionsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

InstitutionsTable.defaultProps = {
  data: [],
};

export { InstitutionsTable };
