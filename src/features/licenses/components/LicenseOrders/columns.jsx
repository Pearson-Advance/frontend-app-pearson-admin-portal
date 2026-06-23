/* eslint-disable react/prop-types */
import React from 'react';
import {
  Badge,
  OverlayTrigger,
  Tooltip,
  IconButton,
} from '@openedx/paragon';
import { Edit, DeleteOutline } from '@openedx/paragon/icons';

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
    // Inactive (already removed) orders are read-only: no Edit or Remove actions.
    Cell: ({ row }) => (row.values.active ? (
      <div className="d-flex">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip variant="light">edit</Tooltip>}
        >
          <IconButton
            alt="Edit"
            iconAs={Edit}
            onClick={() => {
              props.handleOpenModal(
                row.values.id,
                row.values.orderReference,
                row.values.purchasedSeats,
                row.values.active,
              );
            }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip variant="light">remove order</Tooltip>}
        >
          <IconButton
            alt="Remove order"
            iconAs={DeleteOutline}
            variant="danger"
            onClick={() => props.handleOpenDeleteModal(row.values.id)}
          />
        </OverlayTrigger>
      </div>
    ) : null),
  },
];
