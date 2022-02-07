/* eslint-disable react/prop-types */

import { Badge } from '@edx/paragon';

export const COLUMNS = [
  {
    Header: 'Institution',
    accessor: 'institution',
  },
  {
    Header: 'Master Course Name',
    accessor: 'masterCourseName',
  },
  {
    Header: 'Master Course ID',
    accessor: 'masterCourseId',
  },
  {
    Header: 'Ccx Id',
    accessor: 'ccxId',
  },
  {
    Header: 'Ccx Name',
    accessor: 'ccxName',
  },
  {
    Header: 'Coach Email',
    accessor: 'ccxCoachEmail',
  },
  {
    Header: 'Learner Email',
    accessor: 'learnerEmail',
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ row }) => {
      const value = row.values.status;
      let variant = 'success';

      if (value === 'Pending') { variant = 'warning'; } else if (value === 'Inactive') { variant = 'danger'; }

      return <Badge variant={variant}>{value}</Badge>;
    },
  },
  {
    Header: 'Remaining Accesss Time (days)',
    accessor: 'remainingCourseAccessDuration',
  },
  {
    Header: 'Created at',
    accessor: 'created',
    Cell: ({ row }) => new Date(row.values.created).toUTCString(),
  },
];
