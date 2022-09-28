import {
  DataTable, IconButton, OverlayTrigger, Tooltip,
} from '@edx/paragon';
import { Launch } from '@edx/paragon/icons';
import PropTypes from 'prop-types';
import React from 'react';

const getCcxInstructorUrl = (ccxId) => `${process.env.LMS_BASE_URL}/courses/${ccxId}/instructor`;

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
      Header: 'CCX ID',
      accessor: 'ccxId',
    },
    {
      Header: 'CCX Name',
      accessor: 'ccxName',
    },
    {
      Header: 'Institution Admin',
      accessor: 'institutionAdmin',
    },
    {
      Header: 'Total Enrolled',
      accessor: 'totalEnrolled',
    },
    {
      Header: 'Actions',
      accessor: 'id',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => ( // eslint-disable-line react/prop-types
        <>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip variant="light">Go to CCX instructor dashboard</Tooltip>}
          >
            <IconButton
              alt="Go to instructor dashboard"
              iconAs={Launch}
              onClick={() => {
                window.open(getCcxInstructorUrl(row.values.ccxId), '_blank', 'noopener, noreferrer'); // eslint-disable-line react/prop-types
              }}
            />
          </OverlayTrigger>
        </>
      ),
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
