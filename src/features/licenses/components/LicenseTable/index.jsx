import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { PersistController } from 'features/shared/components/PersistController';
import { fetchLicenses } from 'features/licenses/data';
import { DataTable, TextFilter } from '@edx/paragon';
import { getColumns } from './columns';

const LicenseTable = () => {
  const dispatch = useDispatch();
  const {
    pageSize, pageIndex, filters, sortBy,
  } = useSelector(state => state.page.dataTable);
  const columns = useMemo(() => getColumns(), []);
  const { data } = useSelector(state => state.licenses);

  useEffect(() => {
    dispatch(fetchLicenses());
  }, [dispatch]);

  return (
    <DataTable
      isSortable
      isPaginated
      isFilterable
      showFiltersInSidebar
      defaultColumnValues={{ Filter: TextFilter }}
      initialState={{
        pageSize, pageIndex, filters: JSON.parse(filters), sortBy,
      }}
      itemCount={data.length}
      data={data}
      columns={columns}
    >
      <DataTable.Table />
      <DataTable.EmptyTable content="No results found." />
      <DataTable.TableFooter />
      <PersistController />
    </DataTable>
  );
};

export { LicenseTable };
