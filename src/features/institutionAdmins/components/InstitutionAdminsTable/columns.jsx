/* eslint-disable react/prop-types */
import { Badge } from '@edx/paragon';

export const COLUMNS = [
  {
    Header: 'Institution',
    accessor: 'institution',
    Cell: ({ row }) => row.values.institution.name,
  },
  {
    Header: 'Coach username',
    accessor: 'user',
    Cell: ({ row }) => row.values.user.username,
  },
  {
    Header: 'Coach email',
    accessor: 'email',
    Cell: ({ row }) => row.values.user.email,
  },
  {
    Header: 'Active',
    accessor: 'active',
    Cell: ({ row }) => <Badge variant={row.values.active ? 'success' : 'danger'}>{row.values.active ? 'Yes' : 'No'}</Badge>,
  },
];
