import React from 'react';
import { DataTable } from '@edx/paragon';
import PropTypes from 'prop-types';
import { COLUMNS } from './columns';

export const LicenseOrders = ({ data }) => (
  <DataTable
    columns={COLUMNS}
    itemCount={data.length}
    data={data}
  >
    <DataTable.Table />
    <DataTable.EmptyTable content="No orders found." />
  </DataTable>
);

LicenseOrders.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

LicenseOrders.defaultProps = {
  data: [],
};
