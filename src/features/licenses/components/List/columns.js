/* eslint-disable react/prop-types */
import { CheckboxFilter, Form, Spinner } from '@edx/paragon';
import { has } from 'lodash';


// Columns:

// Institution Name
// Course Name
// Course ID
// Status
// Expiration
// Purchased Seats
// Course Access Duration
// The following are common requirements for all 'list' pages:

// The user can specify the number of entries to display per page.
// If there are more than can be displayed in a single page, then paging controls can be used.
// The list can be sorted by training center or course name or course ID.
// If the list is resorted then the user is moved back to page 1.
// The number of pages should reflect # entries / page size.


export const getColumns = props => [
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
    Header: 'Expiration Date',
    accessor: 'licenseExpiration',
  },
  {
    Header: 'Purchased seats',
    accessor: 'purchasedSeats',
  },
  {
    Header: 'Course access duration',
    accessor: 'courseAccessDuration',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];
