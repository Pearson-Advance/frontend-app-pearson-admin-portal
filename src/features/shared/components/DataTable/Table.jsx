import { Icon } from '@edx/paragon';
import { ArrowDropUpDown, ArrowDropUp, ArrowDropDown } from '@edx/paragon/icons';
import React, { useContext } from 'react';
import { DataTableContext } from './DataTableContext';

export const Table = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
  } = useContext(DataTableContext);

  const renderSortingIndicators = (column) => {
    if (column.isSorted) {
      return column.isSortedDesc ? <Icon src={ArrowDropDown} /> : <Icon src={ArrowDropUp} />;
    }
    return <Icon style={{ opacity: 0.5 }} src={ArrowDropUpDown} />;
  };

  return (
    <>
      <table {...getTableProps()} className="pgn__data-table is-striped pgn__data-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span className="d-flex align-items-center">
                    {column.render('Header')}
                    {column.canSort && renderSortingIndicators(column)}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        !pageCount
        && <div className="pgn__data-table-empty d-flex justify-content-center">No results found.</div>
      }
    </>
  );
};
