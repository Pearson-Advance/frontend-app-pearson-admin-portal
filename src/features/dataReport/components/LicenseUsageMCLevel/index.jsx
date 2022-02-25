import {
  Icon, IconButton, OverlayTrigger, Pagination, Tooltip,
} from '@edx/paragon';
import PropTypes from 'prop-types';
import { Download } from '@edx/paragon/icons';
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchExportLicenseUsageMCLevel, fetchLicenseUsageMCLevel } from 'features/dataReport/data/thunks';
import { fetchLicenseManageCourses } from 'features/licenses/data';
import { Table } from './Table';

export const LicenseUsageMCLevel = ({ filters }) => {
  const dispatch = useDispatch();
  const mcLevelTable = useSelector(state => state.dataReport.mcLevelData);

  const handleExportAsCSV = () => {
    dispatch(fetchExportLicenseUsageMCLevel(filters));
  };

  const handlePagination = (targetPage) => {
    dispatch(fetchLicenseUsageMCLevel({
      ...filters,
      page: targetPage,
    }));
  };

  useEffect(() => {
    dispatch(fetchLicenseManageCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLicenseUsageMCLevel(filters));
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
      <Table data={mcLevelTable.results} count={mcLevelTable.count} />
      {mcLevelTable.count > 0 && (
      <Pagination
        paginationLabel="navigation"
        className="pt-3"
        pageCount={mcLevelTable.numPages}
        currentPage={mcLevelTable.currentPage}
        onPageSelect={handlePagination}
      />
      )}
    </>
  );
};

LicenseUsageMCLevel.propTypes = {
  filters: PropTypes.shape({
    institutionId: PropTypes.number,
    masterCourseId: PropTypes.string,
    page: PropTypes.number.isRequired,
  }),
};

LicenseUsageMCLevel.defaultProps = {
  filters: {
    institutionId: null,
    masterCourseId: null,
    page: 1,
  },
};
