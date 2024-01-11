/* eslint-disable react/prop-types */
import {
  IconButton, OverlayTrigger, Tooltip,
} from '@edx/paragon';
import { BookOpen, Edit } from '@edx/paragon/icons';

export const getColumns = ({ handleShowDetails, handleEditModal }) => [
  {
    Header: 'License Name',
    accessor: 'licenseName',
    disableFilters: true,
  },
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
    filter: 'text',
    disableSortBy: true,
  },
  {
    Header: 'Courses',
    accessor: ({ courses }) => courses.map(course => course.id),
    disableSortBy: true,
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
      <>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip variant="light">View details</Tooltip>}
        >
          <IconButton
            alt="View"
            iconAs={BookOpen}
            onClick={() => handleShowDetails(row.values.id)}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip variant="light">Edit</Tooltip>}
        >
          <IconButton
            alt="Edit"
            iconAs={Edit}
            onClick={() => {
              handleEditModal(
                row.values.id,
                row.values.licenseName,
                row.values.Institution,
                row.values.Courses,
                row.values.status,
              );
            }}
          />
        </OverlayTrigger>
      </>
    ),
  },
];
