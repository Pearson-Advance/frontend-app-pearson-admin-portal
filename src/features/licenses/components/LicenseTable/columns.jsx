/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  IconButton, OverlayTrigger, Tooltip, Badge,
} from '@openedx/paragon';
import { BookOpen, Edit } from '@openedx/paragon/icons';
import { filter as lodashFilter } from 'lodash';

import { LicenseTypes } from 'features/shared/data/constants';

export const getColumns = ({ handleShowDetails, handleEditModal }) => [
  {
    Header: 'License Name',
    accessor: 'licenseName',
    disableFilters: true,
  },
  {
    Header: 'Institution',
    accessor: 'institution',
    id: 'institution',
    disableFilters: true,
    Cell: ({ row }) => row.original?.institution?.name || '',
  },
  {
    Header: 'Master Courses / Catalogs',
    accessor: 'courses',
    id: 'masterCoursesOrCatalogs',
    filter: 'text',
    disableSortBy: true,
    Cell: ({ row }) => {
      const { licenseType, courses = [], catalogs = [] } = row.original;
      const catalogsList = useSelector(state => state.licenses.catalogs.data);

      if (licenseType === LicenseTypes.CATALOG) {
        const elements = catalogs.map((catalog) => lodashFilter(catalogsList, { value: catalog }));
        return (
          <>
            {elements.map((el) => (
              <Badge
                key={el?.[0]?.value || el?.[0]?.label || Math.random()}
                variant="light"
                className="mr-2 p-2 mb-2"
              >
                {el?.[0]?.label || ''}
              </Badge>
            ))}
          </>
        );
      }
      if (licenseType === LicenseTypes.COURSES) {
        return (
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {courses.map((course) => (
              <li key={course.id}>
                {`${course.id} - ${course.displayName}`}
              </li>
            ))}
          </ul>
        );
      }

      return null;
    },
  },
  {
    Header: 'Courses',
    accessor: 'courses',
    id: 'courseIds',
    disableSortBy: true,
    Cell: ({ row }) => {
      const { courses = [] } = row.original;
      return courses.map(c => c.id).join(', ');
    },
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
          overlay={<Tooltip id={`license-view-${row.values.id}`} variant="light">View details</Tooltip>}
        >
          <IconButton
            alt="View"
            iconAs={BookOpen}
            onClick={() => handleShowDetails(row.values.id)}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`license-edit-${row.values.id}`} variant="light">Edit</Tooltip>}
        >
          <IconButton
            alt="Edit"
            iconAs={Edit}
            onClick={() => {
              const editData = {
                id: row.values.id,
                licenseName: row.values.licenseName,
                institution: row.original.institution,
                courses: row.original.courses,
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
