/* eslint-disable react/prop-types */
import {
  IconButton, OverlayTrigger, Tooltip,
} from '@edx/paragon';
import { BookOpen } from '@edx/paragon/icons';

export const getColumns = ({ handleSowDetails }) => [
  {
    Header: 'Institution',
    accessor: ({ institution }) => institution.name,
  },
  {
    Header: 'Course name',
    accessor: ({ course }) => course.displayName,
  },
  {
    Header: 'Course ID',
    accessor: ({ course }) => course.id,
  },
  {
    Header: 'Purchased seats',
    accessor: 'purchasedSeats',
    disableFilters: true,
  },
  {
    Header: 'Course access duration',
    accessor: 'courseAccessDuration',
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'Status',
    accessor: 'status',
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'Actions',
    accessor: 'id',
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ row }) => (
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip variant="light">View details</Tooltip>}
      >
        <IconButton
          alt="Edit"
          iconAs={BookOpen}
          onClick={() => handleSowDetails(row.values.id)}
        />
      </OverlayTrigger>
    ),
  },
];
