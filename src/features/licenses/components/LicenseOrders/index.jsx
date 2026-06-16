import React from 'react';
import { DataTable } from '@openedx/paragon';
import PropTypes from 'prop-types';
import { getColumns } from 'features/licenses/components/LicenseOrders/columns';

const LicenseOrders = ({ data, handleOpenModal, handleOpenDeleteModal }) => {
  const COLUMNS = getColumns({ handleOpenModal, handleOpenDeleteModal });

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
  handleOpenModal: PropTypes.func,
  handleOpenDeleteModal: PropTypes.func,
};

LicenseOrders.defaultProps = {
  data: [],
  handleOpenModal: () => {},
  handleOpenDeleteModal: () => {},
};

export { LicenseOrders };
