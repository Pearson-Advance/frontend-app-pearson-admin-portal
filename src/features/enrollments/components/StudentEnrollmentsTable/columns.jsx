/* eslint-disable react/prop-types */
import React from 'react';
import {
  Badge,
  Dropdown,
  Icon,
  IconButton,
} from '@edx/paragon';
import { MoreHoriz } from '@edx/paragon/icons';

import { EnrollmentStatus } from 'features/shared/data/constants';

const getColumns = props => [
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
    disableSortBy: true,
  },
  {
    Header: 'Ccx Id',
    accessor: 'ccxId',
    disableSortBy: true,
  },
  {
    Header: 'Ccx Name',
    accessor: 'ccxName',
    disableSortBy: true,
  },
  {
    Header: 'Admin Email',
    accessor: 'ccxAdminEmail',
  },
  {
    Header: 'Learner Email',
    accessor: 'learnerEmail',
  },
  {
    Header: 'Status',
    accessor: 'status',
    disableSortBy: true,
    Cell: ({ row }) => {
      const value = row.values.status;
      let variant = 'success';

      if (value === EnrollmentStatus.PENDING) {
        variant = 'warning';
      } else if (value === EnrollmentStatus.INACTIVE) {
        variant = 'danger';
      } else if (value === EnrollmentStatus.EXPIRED) {
        variant = 'light';
      }

      return <Badge variant={variant}>{value}</Badge>;
    },
  },
  {
    Header: 'Remaining Accesss Time (days)',
    accessor: 'remainingCourseAccessDuration',
    disableSortBy: true,
  },
  {
    Header: 'Created at',
    accessor: 'created',
    Cell: ({ row }) => new Date(row.values.created).toUTCString(),
    disableSortBy: true,
  },
  {
    Header: 'Action',
    accessor: 'action',
    cellClassName: 'dropdownColumn',
    disableSortBy: true,
    Cell: ({ row }) => {
      const value = row.values;

      const optionText = {
        [EnrollmentStatus.ACTIVE]: {
          text: 'Disable',
        },
        [EnrollmentStatus.INACTIVE]: {
          text: 'Enable',
        },
        [EnrollmentStatus.PENDING]: {
          text: 'Revoke',
        },
        [EnrollmentStatus.EXPIRED]: {
          text: 'Extend',
        },
      };

      const columnText = optionText[value.status]?.text || '';

      return (
        <Dropdown className="dropdowntpz">
          <Dropdown.Toggle
            id="dropdown-toggle-with-iconbutton"
            as={IconButton}
            src={MoreHoriz}
            iconAs={Icon}
            variant="primary"
            data-testid="droprown-action"
            menuAlign="right"
            alt="menu for actions"
          />
          <Dropdown.Menu>
            <Dropdown.Item
              className="text-truncate text-decoration-none custom-text-black"
              onClick={() => {
                props.open();
                props.setRow(value);
              }}
            >
              {columnText}
            </Dropdown.Item>

            {
              value.status === EnrollmentStatus.ACTIVE && (
                <Dropdown.Item
                  className="text-truncate text-decoration-none custom-text-black"
                  onClick={() => {
                    props.setRow({ ...value, status: EnrollmentStatus.EXPIRED });
                    props.open();
                  }}
                >
                  {optionText[EnrollmentStatus.EXPIRED].text}
                </Dropdown.Item>
              )
            }
          </Dropdown.Menu>
        </Dropdown>
      );
    },
  },
];

const hideColumns = { hiddenColumns: ['ccxId', 'masterCourseId'] };

export { hideColumns, getColumns };
