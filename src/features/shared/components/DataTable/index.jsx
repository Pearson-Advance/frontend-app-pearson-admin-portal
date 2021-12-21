import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useSortBy } from '@edx/paragon';
import { Footer } from './Footer';
import { Table } from './Table';
import { DataTableContext } from './DataTableContext';

const DataTable = (props) => {
  const {
    data,
    columns,
    internalPageIndex,
    internalPageSize,
  } = props;
  const tableContext = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: internalPageIndex,
        pageSize: internalPageSize,
      },
    },
    useSortBy,
    usePagination,
  );

  return (
    <DataTableContext.Provider value={tableContext}>
      <div className="pgn__data-table-container">
        <Table />
        <Footer />
      </div>
    </DataTableContext.Provider>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  columns: PropTypes.arrayOf(PropTypes.shape([])),
  internalPageIndex: PropTypes.number,
  internalPageSize: PropTypes.number,
};

DataTable.defaultProps = {
  data: [],
  columns: [],
  internalPageIndex: 0,
  internalPageSize: 0,
};

export { DataTable };
