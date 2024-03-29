/* eslint-disable react/prop-types */
import { CheckboxFilter, Form, Spinner } from '@edx/paragon';
import { has } from 'lodash';

export const getColumns = props => [
  {
    Header: 'Institution',
    accessor: ({ institution }) => institution.name,
    disableFilters: true,
  },
  {
    Header: 'Admin username',
    accessor: ({ user }) => user.username,
  },
  {
    Header: 'Admin email',
    accessor: ({ user }) => user.email,
  },
  {
    Header: 'Active',
    accessor: 'active',
    disableSortBy: true,
    Cell: ({ row }) => {
      if (!has(row.original, 'loading')) {
        return (
          <Form.Group
            controlId={`formSwitch-${row.id}`}
          >
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
