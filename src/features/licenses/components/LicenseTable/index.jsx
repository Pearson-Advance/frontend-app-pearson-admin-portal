import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchLicenses } from 'features/licenses/data';
import { DataTable } from 'features/shared/components/DataTable';
import { getColumns } from './columns';

const LicenseTable = () => {
  const dispatch = useDispatch();

  const columns = useMemo(() => getColumns(), []);
  const {
    data,
    pageSize,
    pageIndex,
  } = useSelector(state => state.licenses);

  useEffect(() => {
    dispatch(fetchLicenses());
  }, [dispatch]);

  return (
    <div className="pgn__data-table-wrapper mb-4">
      <DataTable
        data={data}
        columns={columns}
        internalPageIndex={pageIndex}
        internalPageSize={pageSize}
      />
    </div>
  );
};

export { LicenseTable };
