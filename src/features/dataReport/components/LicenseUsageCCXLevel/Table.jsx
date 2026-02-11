import {
  DataTable, IconButton, OverlayTrigger, Tooltip,
} from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { Launch, Share } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const getCcxUrl = (ccxId) => `${getConfig().LMS_BASE_URL}${getConfig().LEARNING_MFE_PATH}/course/${ccxId}`;
const getCcxInstructorUrl = (ccxId) => `${getConfig().LMS_BASE_URL}/courses/${ccxId}/instructor`;

export const Table = ({ data, count }) => {
  const [isCCXUrlCopied, setisCCXUrlCopied] = useState(false);

  function openCcxInstructorUrl(ccxId) {
    window.open(getCcxInstructorUrl(ccxId), '_blank', 'noopener, noreferrer');
  }

  function copyCcxUrl(ccxId) {
    navigator.clipboard.writeText(getCcxUrl(ccxId))
      .then(setisCCXUrlCopied(true));
  }

  const columns = [
    {
      Header: 'Institution',
      accessor: 'institution',
    },
    {
      Header: 'Master Course',
      accessor: 'masterCourse',
    },
    {
      Header: 'Purchased seats',
      accessor: 'purchasedSeats',
    },
    {
      Header: 'CCX ID',
      accessor: 'ccxId',
    },
    {
      Header: 'CCX Name',
      accessor: 'ccxName',
    },
    {
      Header: 'Institution Admin',
      accessor: 'institutionAdmin',
    },
    {
      Header: 'Total Enrolled',
      accessor: 'totalEnrolled',
    },
    {
      Header: 'Actions',
      accessor: 'id',
      disableFilters: true,
      disableSortBy: true,
      Cell: ({ row }) => ( // eslint-disable-line react/prop-types
        <>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip variant="light">Go to CCX instructor dashboard</Tooltip>}
          >
            <IconButton
              alt="Go to instructor dashboard"
              iconAs={Launch}
              onClick={() => { openCcxInstructorUrl(row.values.ccxId); }} // eslint-disable-line react/prop-types
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip variant="light">{isCCXUrlCopied ? 'CCX URL Copied!' : 'Copy CCX URL'}</Tooltip>}
            onExited={() => { setisCCXUrlCopied(false); }}
          >
            <IconButton
              alt="Copy CCX URL"
              iconAs={Share}
              onClick={() => { copyCcxUrl(row.values.ccxId); }} // eslint-disable-line react/prop-types
            />
          </OverlayTrigger>
        </>
      ),
    },
  ];

  return (
    <DataTable
      itemCount={count}
      data={data}
      columns={columns}
    >
      <DataTable.Table />
      <DataTable.EmptyTable content="No data found." />
      <DataTable.TableFooter />
    </DataTable>
  );
};

Table.propTypes = {
  count: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

Table.defaultProps = {
  data: [],
};
