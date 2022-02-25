import {
  Icon, IconButton, OverlayTrigger, Pagination, Tooltip,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import { Download } from '@edx/paragon/icons';
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchExportLicenseUsageCCXLevel, fetchLicenseUsageCCXLevel } from 'features/dataReport/data/thunks';
import { fetchEligibleCourses } from 'features/licenses/data';
import { Table } from './Table';

export const LicenseUsageCCXLevel = ({ filters }) => {
  const dispatch = useDispatch();
  const ccxLevelTable = useSelector(state => state.dataReport.ccxLevelResponse);

  const handleExportAsCSV = () => {
    dispatch(fetchExportLicenseUsageCCXLevel(filters));
  };

  const handlePagination = (targetPage) => {
    dispatch(fetchLicenseUsageCCXLevel({
      ...filters,
      page: targetPage,
    }));
  };

  useEffect(() => {
    dispatch(fetchEligibleCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLicenseUsageCCXLevel(filters));
  }, [dispatch, filters]);

  return (
    <>
      <div className="d-flex justify-content-end py-2">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip variant="light">Export as CSV</Tooltip>}
        >
          <IconButton
            src={Download}
            iconAs={Icon}
            alt="Close"
            onClick={handleExportAsCSV}
            variant="secondary"
            className="mr-2"
          />
        </OverlayTrigger>
      </div>
      <Table data={ccxLevelTable.results} count={ccxLevelTable.count} />
      {ccxLevelTable.count > 0 && (
        <Pagination
          paginationLabel="navigation"
          className="pt-3"
          pageCount={ccxLevelTable.numPages}
          currentPage={ccxLevelTable.currentPage}
          onPageSelect={handlePagination}
        />
      )}
    </>
  );
};

LicenseUsageCCXLevel.propTypes = {
  filters: PropTypes.shape({
    institutionId: PropTypes.number,
    masterCourseId: PropTypes.string,
    page: PropTypes.number.isRequired,
  }),
};

LicenseUsageCCXLevel.defaultProps = {
  filters: {
    institutionId: null,
    masterCourseId: null,
    page: 1,
  },
};
