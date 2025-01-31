import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { DataTable, TextFilter } from '@edx/paragon';

import { PersistController } from 'features/shared/components/PersistController';

import { getColumns } from './columns';
import { openLicenseModal } from '../../data/slices';

const LicenseTable = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    pageSize, pageIndex, filters, sortBy,
  } = useSelector(state => state.page.dataTable);

  const handleShowDetails = (licenseId) => {
    history.push(`/licenses/${licenseId}`);
  };

  const handleEditModal = (id, licenseName, institution, courses, status, catalogs) => {
    dispatch(openLicenseModal({
      id, licenseName, institution, courses, status, catalogs,
    }));
  };

  const columns = getColumns({ handleShowDetails, handleEditModal });

  return (
    <DataTable
      isSortable
      isPaginated
      isFilterable
      showFiltersInSidebar
      defaultColumnValues={{ Filter: TextFilter }}
      initialState={{
        pageSize, pageIndex, filters: JSON.parse(filters), sortBy, hiddenColumns: ['Courses'],
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
