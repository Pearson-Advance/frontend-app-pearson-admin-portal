/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import {
  IconButton, OverlayTrigger, Tooltip, Badge,
} from '@edx/paragon';
import { BookOpen, Edit } from '@edx/paragon/icons';
import { filter } from 'lodash';

import { LicenseTypes } from 'features/shared/data/constants';

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
    Header: 'Master Courses / Catalogs',
    accessor: 'courses',
    filter: 'text',
    disableSortBy: true,
    Cell: ({ row }) => {
      const { licenseType, courses, catalogs } = row.original;
      const catalogsList = useSelector(state => state.licenses.catalogs.data);

      if (licenseType === LicenseTypes.CATALOG) {
        const elements = catalogs.map(catalog => filter(catalogsList, { value: catalog }));
        return (
          elements.map(el => <Badge variant="light" className="mr-2 p-2  mb-2">{el[0].label}</Badge>)

        );
      }
      if (licenseType === LicenseTypes.COURSES) {
        return (
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {courses.map(course => <li key={course}>{`${course.id} - ${course.displayName}`}</li>)}
          </ul>
        );
      }
      return null;
    },
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
              const editData = {
                id: row.values.id,
                licenseName: row.values.licenseName,
                institution: row.values.Institution,
                courses: row.values.Courses,
                status: row.values.status,
                catalogs: row.original.catalogs,
                licenseType: row.original.licenseType,
              };

              handleEditModal(editData);
            }}
          />
        </OverlayTrigger>
      </>
    ),
  },
];
