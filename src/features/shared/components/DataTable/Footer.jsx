import React, { useContext, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import {
  ButtonGroup, Col, Form, Icon, IconButton, Row,
} from '@edx/paragon';
import { ArrowBackIos, ArrowForwardIos } from '@edx/paragon/icons';
import { range } from 'lodash';
import { changePageIndex, changePageSize } from 'features/licenses/data/slices';
import { DataTableContext } from './DataTableContext';

export const Footer = () => {
  const dispatch = useDispatch();
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useContext(DataTableContext);
  const pages = range(0, pageCount);

  const handleChangePageSize = (e) => {
    setPageSize(Number(e.target.value));
  };

  useEffect(() => {
    dispatch(changePageSize(pageSize));
  }, [dispatch, pageSize]);

  useEffect(() => {
    dispatch(changePageIndex(pageIndex));
  }, [dispatch, pageIndex]);

  return (
    <Col className="pgn__data-table-footer">
      <Col className="p-0">
        <Row className="align-items-center">
          <Col md={3}>
            <Row className="align-items-center">
              <Col>
                <ButtonGroup>
                  <IconButton
                    alt="Previous page"
                    size="sm"
                    src={ArrowBackIos}
                    iconAs={Icon}
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                  />
                  <IconButton
                    alt="Next page"
                    size="sm"
                    src={ArrowForwardIos}
                    iconAs={Icon}
                    onClick={nextPage}
                    disabled={!canNextPage}
                  />
                </ButtonGroup>
              </Col>
              <Col>
                Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
              </Col>
            </Row>
          </Col>
          <Col md={2}>
            <Row className="align-items-center">
              <Col className="d-flex justify-content-end">
                Page:
              </Col>
              <Col>
                <Form.Control
                  size="sm"
                  as="select"
                  onChange={e => {
                    gotoPage(Number(e.target.value));
                  }}
                >
                  <option>...</option>
                  {pages.map((number) => <option key={`opt-${number}`} value={number}>{number + 1}</option>)}
                </Form.Control>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col md={3}>
        <Row className="d-flex justify-content-end  align-items-center">
          <Col className="d-flex justify-content-end">
            <span>Items per page:</span>
          </Col>
          <Col md={3}>
            <Form.Control
              style={{ width: '5em' }}
              size="sm"
              as="select"
              onChange={handleChangePageSize}
            >
              <option defaultValue="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Form.Control>
          </Col>
        </Row>
      </Col>
    </Col>
  );
};
