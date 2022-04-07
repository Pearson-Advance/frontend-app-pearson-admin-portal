/* eslint-disable react/prop-types */

import { Badge, Button } from '@edx/paragon';
import React from 'react';

const getColumns = props => [
  {
    Header: 'Institution',
    accessor: 'institution',
  },
  {
    Header: 'Master Course Name',
    accessor: 'masterCourseName',
  },
  {
    Header: 'Master Course ID',
    accessor: 'masterCourseId',
    disableSortBy: true,
  },
  {
    Header: 'Ccx Id',
    accessor: 'ccxId',
    disableSortBy: true,
  },
  {
    Header: 'Ccx Name',
    accessor: 'ccxName',
    disableSortBy: true,
  },
  {
    Header: 'Coach Email',
    accessor: 'ccxCoachEmail',
  },
  {
    Header: 'Learner Email',
    accessor: 'learnerEmail',
  },
  {
    Header: 'Status',
    accessor: 'status',
    disableSortBy: true,
    Cell: ({ row }) => {
      const value = row.values.status;
      let variant = 'success';

      if (value === 'Pending') { variant = 'warning'; } else if (value === 'Inactive') { variant = 'danger'; }

      return <Badge variant={variant}>{value}</Badge>;
    },
  },
  {
    Header: 'Remaining Accesss Time (days)',
    accessor: 'remainingCourseAccessDuration',
    disableSortBy: true,
  },
  {
    Header: 'Created at',
    accessor: 'created',
    Cell: ({ row }) => new Date(row.values.created).toUTCString(),
    disableSortBy: true,
  },
  {
    Header: 'Action',
    accessor: 'action',
    disableSortBy: true,
    Cell: ({ row }) => {
      const value = row.values;
      let variant = 'primary';
      let action = 'Enable';

      switch (value.status) {
        case 'Active':
          action = 'Disable';
          break;
        case 'Pending':
          variant = 'danger';
          action = 'Revoke';
          break;
        case 'Inactive':
          action = 'Enable';
          break;
        default:
          variant = 'primary';
          action = 'Enable';
      }
      return <Button variant={variant} onClick={() => { props.open(); props.setRow(value); }}>{action}</Button>;
    },
  },
];

const hideColumns = { hiddenColumns: ['ccxId', 'masterCourseId'] };

export { hideColumns, getColumns };
