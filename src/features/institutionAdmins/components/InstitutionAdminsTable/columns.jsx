/* eslint-disable react/prop-types */
import React from 'react';
import { CheckboxFilter, Form, Spinner } from '@openedx/paragon';
import { has } from 'lodash';

export const getColumns = (props) => [
  {
    Header: 'Institution',
    accessor: 'institution',
    disableFilters: true,
    Cell: ({ row }) => row.original?.institution?.name || '',
  },
  {
    Header: 'Admin username',
    id: 'username',
    accessor: (row) => row.user?.username || '',
    Cell: ({ row }) => row.original?.user?.username || '',
  },
  {
    Header: 'Admin email',
    id: 'email',
    accessor: (row) => row.user?.email || '',
    Cell: ({ row }) => row.original?.user?.email || '',
  },
  {
    Header: 'Active',
    accessor: 'active',
    disableSortBy: true,
    Cell: ({ row }) => {
      if (!has(row.original, 'loading')) {
        return (
          <Form.Group controlId={`formSwitch-${row.id}`}>
            <Form.Check
              type="switch"
              checked={row.values.active}
              id={`active-switch-${row.id}`}
              onChange={() => { props.setRow(row.original); props.open(); }}
            />
          </Form.Group>
        );
      }
      return <Spinner animation="border" />;
    },

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
      return rows.filter(r => selected.has(String(Boolean(r.values[id]))));
    },
  },
];
