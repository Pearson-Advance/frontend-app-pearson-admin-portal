import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { PersistController } from 'features/shared/components/PersistController';
import { DataTable, TextFilter } from '@edx/paragon';
import { getColumns } from './columns';

const LicenseTable = ({ data, handleOpenModal }) => {
  const history = useHistory();
  const {
    pageSize, pageIndex, filters, sortBy,
  } = useSelector(state => state.page.dataTable);

  const handleSowDetails = (licenseId) => {
    history.push(`/licenses/${licenseId}`);
  };

  const columns = useMemo(() => getColumns({ handleSowDetails, handleOpenModal }), []);

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

LicenseTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

LicenseTable.defaultProps = {
  data: [],
};

export { LicenseTable };
