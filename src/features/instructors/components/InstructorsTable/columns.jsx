/* eslint-disable react/prop-types */
import React from 'react';
import { formatUTCDate } from 'features/shared/helpers';

const getColumns = () => [
  {
    Header: 'Institution',
    accessor: 'institutionName',
  },
  {
    Header: 'Instructor Name',
    accessor: 'instructorName',
  },
  {
    Header: 'Instructor Email',
    accessor: 'instructorEmail',
  },
  {
    Header: 'Instructor Status',
    accessor: 'instructorStatus',
    disableSortBy: true,
    Cell: ({ row }) => (
      <span>{row.original.active ? 'Active' : 'Inactive'}</span>
    ),
  },
  {
    Header: 'Master Course Name',
    accessor: 'masterCourseName',
  },
  {
    Header: 'CCX Name',
    accessor: 'className',
    disableSortBy: true,
  },
  {
    Header: 'CCX Start Date',
    accessor: 'startDate',
    disableSortBy: true,
    Cell: ({ row }) => (row.values.startDate ? formatUTCDate(row.values.startDate, 'MM/dd/yy') : '-'),
  },
  {
    Header: 'CCX End Date',
    accessor: 'endDate',
    disableSortBy: true,
    Cell: ({ row }) => (row.values.endDate ? formatUTCDate(row.values.endDate, 'MM/dd/yy') : '-'),
  },
];

export { getColumns };
