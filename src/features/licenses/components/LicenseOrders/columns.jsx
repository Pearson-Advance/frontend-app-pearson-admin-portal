/* eslint-disable react/prop-types */

import { Badge } from '@edx/paragon';

export const COLUMNS = [
  {
    Header: 'Order Reference',
    accessor: 'orderReference',
  },
  {
    Header: 'Purchased seats',
    accessor: 'purchasedSeats',
  },
  {
    Header: 'Status',
    accessor: 'active',
    Cell: ({ row }) => <Badge variant={row.values.active ? 'success' : 'danger'}>{row.values.active ? 'Yes' : 'No'}</Badge>,
  },
];
