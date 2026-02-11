/* eslint-disable react/prop-types */
import React from 'react';
import {
  Badge, IconButton, Tooltip, OverlayTrigger, CheckboxFilter,
} from '@openedx/paragon';
import { Edit } from '@openedx/paragon/icons';

export const getColumns = (props) => [
  {
    Header: 'Name',
    accessor: 'name',
    disableFilters: true,
  },
  {
    Header: 'Short name',
    accessor: 'shortName',
  },
  {
    Header: 'External ID',
    accessor: 'externalId',
  },
  {
    Header: 'Active',
    accessor: 'active',
    disableSortBy: true,
    Cell: ({ row }) => (
      <Badge variant={row.values.active ? 'success' : 'danger'}>
        {row.values.active ? 'Yes' : 'No'}
      </Badge>
    ),
    Filter: CheckboxFilter,

    filterChoices: [
      { name: 'yes', value: 'true' },
      { name: 'no', value: 'false' },
    ],

    filter: (rows, id, filterValues) => {
      if (!filterValues || filterValues.length === 0) {
        return rows;
      }

      const selected = new Set(filterValues);
      return rows.filter((r) => selected.has(String(Boolean(r.values[id]))));
    },
  },
  {
    Header: 'Actions',
    accessor: 'id',
    disableFilters: true,
    disableSortBy: true,
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
              row.values.id,
              row.values.name,
              row.values.shortName,
              row.values.externalId,
              row.values.active,
            );
          }}
        />
      </OverlayTrigger>
    ),
  },
];
