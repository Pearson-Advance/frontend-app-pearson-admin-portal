/* eslint-disable react/prop-types */
import React from 'react';
import {
  IconButton, OverlayTrigger, Tooltip, Badge,
} from '@openedx/paragon';
import { BookOpen, Edit } from '@openedx/paragon/icons';
import { filter as lodashFilter } from 'lodash';

import { LicenseTypes } from 'features/shared/data/constants';

export const getColumns = ({ handleShowDetails, handleEditModal, catalogsList = [] }) => [
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
    filter: (rows, columnIds, filterValue) => {
      if (!filterValue) { return rows; }
      const searchValue = filterValue.toLowerCase();
      return rows.filter((row) => {
        const { courses = [], catalogs = [], licenseType } = row.original;
        if (licenseType === LicenseTypes.COURSES) {
          return courses.some(
            (course) => (course.id || '').toLowerCase().includes(searchValue)
              || (course.displayName || '').toLowerCase().includes(searchValue),
          );
        }
        if (licenseType === LicenseTypes.CATALOG) {
          return catalogs.some((catalogId) => {
            const catalogItem = catalogsList.find((c) => c.value === catalogId);
            const catalogName = catalogItem?.label || '';
            return catalogId.toLowerCase().includes(searchValue)
              || catalogName.toLowerCase().includes(searchValue);
          });
        }
        return false;
      });
    },
    disableSortBy: true,
    Cell: ({ row }) => {
      const { licenseType, courses = [], catalogs = [] } = row.original;

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
    Header: 'Purchased seats',
    accessor: 'purchasedSeats',
    disableFilters: true,
  },
  {
    Header: 'Enrolled',
    accessor: 'enrolled',
    disableSortBy: true,
    disableFilters: true,
    Cell: ({ value }) => value ?? 0,
  },
  {
    Header: 'Pending',
    accessor: 'pending',
    disableSortBy: true,
    disableFilters: true,
    Cell: ({ value }) => value ?? 0,
  },
  {
    Header: 'Remaining',
    accessor: 'remaining',
    disableSortBy: true,
    disableFilters: true,
    Cell: ({ value }) => value ?? 0,
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
