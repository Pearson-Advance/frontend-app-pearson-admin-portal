import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Table } from '../../../shared/components/Table';
import { getColumns } from './columns';
import { fetchLicenses } from 'features/licenses/data';
import { ButtonGroup, Col, Form, Icon, IconButton, Pagination, Row, TableFooter } from '@edx/paragon';
import { changePageNumber, changePageSize } from 'features/licenses/data/slices';
import { ArrowBackIos, ArrowForwardIos } from '@edx/paragon/icons'

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
      <div className='pgn__data-table-footer align-items-center justify-content-center'>
        <Row className='col-12 align-items-center p-0'>
          <Col className='col-2 p-0'>
            <Row >
              <Col>
                <ButtonGroup>
                  <IconButton
                    alt="Previous page"
                    src={ArrowBackIos}
                    iconAs={Icon}
                  // onClick={previousPage}
                  // disabled={!canPreviousPage}
                  />
                  <IconButton
                    alt="Next page"
                    src={ArrowForwardIos}
                    iconAs={Icon}
                  // onClick={nextPage}
                  // disabled={!canNextPage}
                  />
                </ButtonGroup>
              </Col>
              <Col className='d-flex justify-content-start align-items-center'>
                page {data.length} of {count}.
              </Col>
            </Row>
          </Col>
          <Col className='col-2 offset-8 '>
            <Row>
              <Col className='d-flex justify-content-end align-items-center'>
                <span>Page size</span>
              </Col>
              <Col>
                  <Form.Control as="select" onChange={handleChangePageSize}>
                    <option defaultValue="2">2</option>
                    <option value="1">1</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </Form.Control>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};


export { List };
