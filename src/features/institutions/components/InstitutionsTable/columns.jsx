/* eslint-disable react/prop-types */
import React from 'react';
import { Badge } from '@edx/paragon';

export const COLUMNS = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Short name',
    accessor: 'shortName',
  },
  {
    Header: 'Active',
    accessor: 'active',
    Cell: ({ row }) => <Badge variant={row.values.active ? 'success' : 'danger'}>{row.values.active ? 'Yes' : 'No'}</Badge>,
  },
];
