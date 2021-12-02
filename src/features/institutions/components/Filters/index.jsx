import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col, Form, Card, Button, Icon, ButtonGroup, Tooltip, OverlayTrigger,
} from '@edx/paragon';
import { Search, Delete } from '@edx/paragon/icons';
import { useHistory, useLocation } from 'react-router';
import Container from '@edx/paragon/dist/Container';
import { setFilters, clearFilters } from '../../data/slices';

export const Filters = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { search, active } = useSelector(state => state.institutions.filters);
  const params = new URLSearchParams(location.search);
  const filters = {
    search: params.get('search') ? params.get('search') : '',
    active: params.get('active') ? params.get('active') : '',
  };

  const handleOnChange = (e) => {
    filters[e.target.id] = e.target.value;

    dispatch(setFilters(filters));
  };

  const handleSearch = e => {
    e.preventDefault();

    const queryObj = {};

    if (search) { queryObj.search = search; }
    if (active) { queryObj.active = active; }

    history.replace(`/?${new URLSearchParams(queryObj).toString()}`);
  };

  const handleClear = () => {
    dispatch(clearFilters());
    history.replace('/');
  };

  useEffect(() => {
    dispatch(setFilters(filters));
  }, [dispatch]);

  return (
    <Container size="sm">
      <Card className="my-3">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Card.Title>
              Search
            </Card.Title>
            <Form.Row>
              <Form.Group as={Col} controlId="search">
                <Form.Control
                  type="text"
                  floatingLabel="Name or short name"
                  value={search}
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="active">
                <Form.Control
                  floatingLabel="Is active"
                  as="select"
                  value={active}
                  onChange={handleOnChange}
                >
                  <option value="">Choose...</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <ButtonGroup size="sm" className="mx-1">
                  <OverlayTrigger
                    key="search"
                    placement="top"
                    overlay={<Tooltip id="tooltip-top">Apply filters</Tooltip>}
                  >
                    <Button variant="inverse-primary" type="submit"><Icon src={Search} /></Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    key="clear"
                    placement="top"
                    overlay={<Tooltip id="tooltip-top">Clear filters</Tooltip>}
                  >
                    <Button variant="inverse-primary" type="reset" onClick={handleClear}><Icon src={Delete} /></Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
