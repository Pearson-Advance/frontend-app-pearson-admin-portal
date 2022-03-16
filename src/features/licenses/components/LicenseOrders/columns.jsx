/* eslint-disable react/prop-types */
import React from 'react';
import {
  Badge,
  OverlayTrigger,
  Tooltip,
  IconButton,
} from '@edx/paragon';
import { Edit } from '@edx/paragon/icons';

export const getColumns = props => [
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
  {
    Header: 'Actions',
    accessor: 'id',
    Cell: ({ row }) => (
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip variant="light">edit</Tooltip>}
      >
        <IconButton
          alt="Edit"
          iconAs={Edit}
          onClick={() => {
            props.handleOpenModal(
              row.values.id, row.values.orderReference, row.values.purchasedSeats, row.values.active,
            );
          }}
        />
      </OverlayTrigger>
    ),
  },
];
