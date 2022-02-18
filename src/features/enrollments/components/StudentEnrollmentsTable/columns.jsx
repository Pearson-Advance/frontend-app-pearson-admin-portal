/* eslint-disable react/prop-types */

import { Badge, Dropdown, DropdownButton } from '@edx/paragon';
import React from 'react';
import { Button } from 'react-bootstrap';

export const getColumns = props => [
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
  },
  {
    Header: 'Ccx Id',
    accessor: 'ccxId',
  },
  {
    Header: 'Ccx Name',
    accessor: 'ccxName',
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
  },
  {
    Header: 'Created at',
    accessor: 'created',
    Cell: ({ row }) => new Date(row.values.created).toUTCString(),
  },
  {
    Header: 'Action',
    accessor: 'action',
    Cell: ({ row }) => {
      const value = row.values.status;
      let variant = 'primary';
      let action = 'Enable';

      if (value === 'Pending') { variant = 'danger'; action = 'Delete'; }
      else if (value === 'Inactive') { variant = 'primary'; action = 'Enable'; }
      else if (value === 'Inactive') { variant = 'warning'; action = 'Delete'; }

      return <Button variant={variant} onClick ={() => {props.open(); props.setRow(row.values); } }>{action}</Button>
    },
  },
];
