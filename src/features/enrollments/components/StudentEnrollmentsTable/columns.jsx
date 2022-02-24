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
      let button = null;

      if (value === 'Pending') {
        button = <Button variant='danger' onClick={() => { props.openDelete(); props.setRow(row.values); }}>Delete</Button>
      }
      else if (value === 'Active') {
        button = <Button variant='primary' onClick={() => { props.openUnenroll(); props.setRow(row.values); }}>Disable</Button>
      }
      else if (value === 'Inactive') {
        button = <Button variant='primary' onClick={() => { props.openEnroll(); props.setRow(row.values); }}>Enable</Button>
      }

      return button
    },
  },
];
