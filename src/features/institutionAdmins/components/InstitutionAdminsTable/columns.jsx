/* eslint-disable react/prop-types */
import { Badge, CheckboxFilter } from '@edx/paragon';

export const COLUMNS = [
  {
    Header: 'Institution',
    accessor: ({ institution }) => institution.name,
  },
  {
    Header: 'Coach username',
    accessor: ({ user }) => user.username,
  },
  {
    Header: 'Coach email',
    accessor: ({ user }) => user.email,
  },
  {
    Header: 'Active',
    accessor: 'active',
    Cell: ({ row }) => <Badge variant={row.values.active ? 'success' : 'danger'}>{row.values.active ? 'Yes' : 'No'}</Badge>,
    Filter: CheckboxFilter,
    filter: 'includesValue',
    filterChoices: [
      {
        name: 'yes',
        value: true,
      },
      {
        name: 'no',
        value: false,
      },
    ],
  },
];
