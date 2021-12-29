import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { PersistController } from 'features/shared/components/PersistController';
import { fetchLicenses } from 'features/licenses/data';
import { DataTable, TextFilter } from '@edx/paragon';
import { getColumns } from './columns';

const LicenseTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    pageSize, pageIndex, filters, sortBy,
  } = useSelector(state => state.page.dataTable);
  const { data } = useSelector(state => state.licenses);

  const handleSowDetails = (licenseId) => {
    history.push(`/licenses/${licenseId}`);
  };

  const columns = useMemo(() => getColumns({ handleSowDetails }), []);

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
