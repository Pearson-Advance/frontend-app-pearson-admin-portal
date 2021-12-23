/* eslint-disable react/prop-types */

export const getColumns = () => [
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
  },
  {
    Header: 'Course access duration',
    accessor: 'courseAccessDuration',
    disableSortBy: true,
  },
  {
    Header: 'Status',
    accessor: 'status',
    disableSortBy: true,
  },
];
