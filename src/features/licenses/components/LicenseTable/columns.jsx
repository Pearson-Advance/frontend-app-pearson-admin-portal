/* eslint-disable react/prop-types */
import {
  IconButton, OverlayTrigger, Tooltip,
} from '@edx/paragon';
import { BookOpen } from '@edx/paragon/icons';

export const getColumns = ({ handleSowDetails }) => [
  {
    Header: 'Institution',
    accessor: ({ institution }) => institution.name,
    disableFilters: true,
  },
  {
    Header: 'Master Courses',
    accessor: ({ courses }) => (
      courses.map(course => `${course.id} - ${course.displayName}`).join('; ')
    ),
    filter: 'includes',
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
  },
  {
    Header: 'Actions',
    accessor: 'id',
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ row }) => (
      <OverlayTrigger
        placement="top"
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
