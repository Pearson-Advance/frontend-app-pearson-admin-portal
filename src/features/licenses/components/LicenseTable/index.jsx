import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable, TextFilter } from '@openedx/paragon';

import { PersistController } from 'features/shared/components/PersistController';

import { getColumns } from './columns';
import { openLicenseModal } from '../../data/slices';
import './index.scss';

const LicenseTable = ({ data, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    pageSize, pageIndex, filters, sortBy,
  } = useSelector(state => state.page.dataTable);

  const catalogsList = useSelector(state => state.licenses.catalogs.data);

  const handleShowDetails = (licenseId) => {
    navigate(`/licenses/${licenseId}`);
  };

  const handleEditModal = (editData) => {
    dispatch(openLicenseModal(editData));
  };

  const columns = getColumns({ handleShowDetails, handleEditModal, catalogsList });

  return (
    <div className="license-table-wrapper">
      <DataTable
        isSortable
        isPaginated
        isFilterable
        isLoading={isLoading}
        showFiltersInSidebar
        defaultColumnValues={{ Filter: TextFilter }}
        initialState={{
          pageSize,
          pageIndex,
          filters: JSON.parse(filters),
          sortBy,
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
    </div>
  );
};

LicenseTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
  isLoading: PropTypes.bool,
};

LicenseTable.defaultProps = {
  data: [],
  isLoading: false,
};

export { LicenseTable };
