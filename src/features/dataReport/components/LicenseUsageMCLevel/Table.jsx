import { DataTable } from '@openedx/paragon';
import PropTypes from 'prop-types';
import React from 'react';

export const Table = ({ data, count }) => {
  const columns = [
    {
      Header: 'Institution',
      accessor: 'institution',
    },
    {
      Header: 'Master Course',
      accessor: 'masterCourse',
    },
    {
      Header: 'Purchased seats',
      accessor: 'purchasedSeats',
    },
    {
      Header: 'Total Enrolled',
      accessor: 'totalEnrolled',
    },
  ];
  return (
    <DataTable
      itemCount={count}
      data={data}
      columns={columns}
    >
      <DataTable.Table />
      <DataTable.EmptyTable content="No data found." />
      <DataTable.TableFooter />
    </DataTable>
  );
};

Table.propTypes = {
  count: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

Table.defaultProps = {
  data: [],
};
