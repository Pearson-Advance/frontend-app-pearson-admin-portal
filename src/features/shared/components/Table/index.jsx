import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { Alert } from '@edx/paragon';

// import './index.scss'

const Table = ({
  data, dataTotalCount, pageSize, pageIndex, columns
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: useMemo(() => columns, []),
    data: data,
    initialState: { pageIndex, pageSize },
  });

  return (
    <div className="pgn__data-table-container">
      <table className="pgn__data-table is-striped pgn__data-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='pgn__data-table-row'>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
          {
            !dataTotalCount
            && (
              <tr>
                <td colSpan="9">
                  <Alert className="d-flex justify-content-center" variant="info">
                    No data to show.
                  </Alert>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  dataTotalCount: PropTypes.number,
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.shape([])),
};

Table.defaultProps = {
  data: [],
  dataTotalCount: 0,
  pageSize: 0,
  pageIndex: 0,
  columns: [],
};

export { Table };
