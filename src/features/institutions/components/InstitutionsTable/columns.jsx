/* eslint-disable react/prop-types */
import {
  Badge, IconButton, Tooltip, OverlayTrigger, CheckboxFilter,
} from '@edx/paragon';
import { Edit } from '@edx/paragon/icons';

export const getColumns = props => [
  {
    Header: 'ID',
    accessor: 'uuid',
    disableFilters: true,
  },
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
