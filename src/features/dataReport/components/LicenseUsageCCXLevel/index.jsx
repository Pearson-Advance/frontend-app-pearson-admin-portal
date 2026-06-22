import {
  Icon, IconButton, OverlayTrigger, Pagination, Tooltip,
} from '@openedx/paragon';
import PropTypes from 'prop-types';
import { Download } from '@openedx/paragon/icons';
import React, { useEffect, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchExportLicenseUsageCCXLevel, fetchLicenseUsageCCXLevel, cancelFetchLicenseUsageCCXLevel } from 'features/dataReport/data/thunks';
import { fetchEligibleCourses, cancelFetchEligibleCourses } from 'features/licenses/data';
import { RequestStatus } from 'features/shared/data/constants';
import { Table } from './Table';

export const LicenseUsageCCXLevel = ({ filters }) => {
  const dispatch = useDispatch();
  const ccxLevelTable = useSelector(state => state.dataReport.ccxLevelResponse);
  const dataReportStatus = useSelector(state => state.dataReport.ccxLevelStatus);
  const institutions = useSelector(state => state.institutions.data);

  const institutionsByName = useMemo(
    () => Object.fromEntries(institutions.map(inst => [inst.name, inst.id])),
    [institutions],
  );

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
    return () => {
      dispatch(cancelFetchEligibleCourses());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLicenseUsageCCXLevel(filters));
    return () => {
      dispatch(cancelFetchLicenseUsageCCXLevel());
    };
  }, [dispatch, filters]);

  return (
    <>
      <div className="py-2 d-flex justify-content-end">
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
      <Table
        data={ccxLevelTable.results}
        count={ccxLevelTable.count}
        isLoading={dataReportStatus === RequestStatus.IN_PROGRESS}
        institutionsByName={institutionsByName}
      />
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
