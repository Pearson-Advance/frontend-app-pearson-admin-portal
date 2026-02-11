import React from 'react';
import { DataTable } from '@openedx/paragon';
import PropTypes from 'prop-types';
import { getColumns } from 'features/licenses/components/LicenseOrders/columns';

const LicenseOrders = ({ data, handleOpenModal }) => {
  const COLUMNS = getColumns({ handleOpenModal });

  return (
    <DataTable
      columns={COLUMNS}
      itemCount={data.length}
      data={data}
    >
      <DataTable.Table />
      <DataTable.EmptyTable content="No orders found." />
    </DataTable>
  );
};

LicenseOrders.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
  handleOpenModal: PropTypes.arrayOf(PropTypes.shape([])),
};

LicenseOrders.defaultProps = {
  data: [],
  handleOpenModal: [],
};

export { LicenseOrders };
