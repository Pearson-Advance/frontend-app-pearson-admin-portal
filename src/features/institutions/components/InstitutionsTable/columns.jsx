/* eslint-disable react/prop-types */
import React from 'react';
import {
  Badge, IconButton, Tooltip, OverlayTrigger, CheckboxFilter,
} from '@edx/paragon';
import { Edit } from '@edx/paragon/icons';

export const getColumns = props => [
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
  {
    Header: 'Actions',
    accessor: 'id',
    disableFilters: true,
    Cell: ({ row }) => (
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip variant="light">edit</Tooltip>}
      >
        <IconButton
          alt="Edit"
          iconAs={Edit}
          onClick={() => {
            props.handleEditModal(
              row.values.id, row.values.name, row.values.shortName, row.values.active,
            );
          }}
        />
      </OverlayTrigger>
    ),
  },
];
