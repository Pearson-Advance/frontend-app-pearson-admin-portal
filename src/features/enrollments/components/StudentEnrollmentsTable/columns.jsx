/* eslint-disable react/prop-types */

import { EnrollmentStatus } from 'features/shared/data/constants';
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
    Header: 'Admin Email',
    accessor: 'ccxAdminEmail',
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

      if (value === EnrollmentStatus.PENDING) {
        variant = 'warning';
      } else if (value === EnrollmentStatus.INACTIVE) {
        variant = 'danger';
      } else if (value === EnrollmentStatus.EXPIRED) {
        variant = 'light';
      }

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

      if (value.status === EnrollmentStatus.EXPIRED) {
        return null;
      }

      switch (value.status) {
        case EnrollmentStatus.ACTIVE:
          action = 'Disable';
          break;
        case EnrollmentStatus.PENDING:
          variant = 'danger';
          action = 'Revoke';
          break;
        case EnrollmentStatus.INACTIVE:
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
