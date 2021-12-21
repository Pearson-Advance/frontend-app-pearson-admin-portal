import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Table } from '../../../shared/components/Table';
import { getColumns } from './columns';
import { fetchLicenses } from 'features/licenses/data';
import { Col, Form, Pagination, TableFooter } from '@edx/paragon';
import { changePageNumber, changePageSize } from 'features/licenses/data/slices';

// import './index.scss'

// import '@edx/paragon/scss/core';
// import '@edx/paragon/src/DataTable'

const List = () => {
  const dispatch = useDispatch();
  const {
    data,
    pageSize,
    pageNumber,
    count,
    numPages,
  } = useSelector(state => state.licenses);
  console.log(data)

  useEffect(() => {
    dispatch(fetchLicenses(pageSize, pageNumber));
  }, [pageSize, pageNumber]);

  const handleChangePageNumber = (newPageNumber) => {
    dispatch(changePageNumber(newPageNumber))
  };

  const handleChangePageSize = (e) => {
    dispatch(changePageSize(e.target.value));
  };


  // https://react-table.tanstack.com/docs/examples/pagination-controlled

  return (
    <div className="pgn__data-table-wrapper mb-4">
      <Table
        data={data}
        columns={getColumns()}
        dataTotalCount={count}
        pageSize={pageSize}
        pageIndex={pageNumber}
      // sortBy={}
      />
      <TableFooter>
        <div>Showing {data.length} of {count}.</div>
        <Pagination
          paginationLabel="pagination navigation"
          pageCount={numPages}
          currentPage={pageNumber}
          onPageSelect={handleChangePageNumber}
        />
        <Form.Row>
          <Form.Group as={Col} controlId="pageSize" onChange={handleChangePageSize}>
            <Form.Control as="select">
              <option defaultValue="2">2</option>
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

      </TableFooter>

    </div>
  );
};


export { List };
