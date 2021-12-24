import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchLicenses } from 'features/licenses/data';
import { DataTable } from '@edx/paragon';
import { getColumns } from './columns';

const LicenseTable = () => {
  const dispatch = useDispatch();

  const columns = useMemo(() => getColumns(), []);
  const { data } = useSelector(state => state.licenses);

  useEffect(() => {
    dispatch(fetchLicenses());
  }, [dispatch]);

  return (
    <div className="pgn__data-table-wrapper mb-4">
      <DataTable
        isSortable
        isPaginated
        initialState={{
          pageSize: 10,
          pageIndex: 0,
        }}
        itemCount={data.length}
        data={data}
        columns={columns}
      >
        <DataTable.Table />
        <DataTable.EmptyTable content="No results found." />
        <DataTable.TableFooter />
      </DataTable>
    </div>
  );
};

export { LicenseTable };
