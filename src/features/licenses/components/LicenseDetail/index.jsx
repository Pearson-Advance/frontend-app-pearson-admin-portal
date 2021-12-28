import {
  ActionRow, Button, Card, Col, Container, Icon, IconButton, Row, Spinner,
} from '@edx/paragon';
import { Add, ArrowBack } from '@edx/paragon/icons';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router';
import { fetchLicensebyId } from '../../data/thunks';
import { LicenseOrders } from '../LicenseOrders';

export const LicenseDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { licenseById } = useSelector(state => state.licenses);

  const handleGoBackClick = () => {
    history.push('/licenses');
  };

  useEffect(() => {
    dispatch(fetchLicensebyId(id));
  }, [id]);

  return (
    <Container size="xl" className="p-4">
      {!licenseById
        && (
          <div className="d-flex justify-content-center pb-4">
            <Spinner animation="border" className="mr-3" screenReaderText="loading" />
          </div>
        )}
      {licenseById
        && (
          <>
            <Button
              className="mb-3"
              variant="tertiary"
              iconBefore={ArrowBack}
              onClick={handleGoBackClick}
            >
              Go back
            </Button>
            <Row>
              <Col xl={4} lg={4}>
                <Card className="mb-2">
                  <Card.Header title="License details" />
                  <Card.Body>
                    <Card.Text>
                      <p><b>Institution:</b> {licenseById.institution.name}</p>
                      <p><b>Course:</b> {licenseById.course.displayName} - ({licenseById.course.id})</p>
                      <p><b>Purchased seats:</b> {licenseById.purchasedSeats}</p>
                      <p><b>Course access duration:</b> {licenseById.courseAccessDuration} days</p>
                      <p><b>Status:</b> {licenseById.status}</p>
                      <p><b># orders:</b> {licenseById.licenseOrder.length}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
              <Col>
                <Card className="mb-2">
                  <Card.Header
                    title="Orders"
                    actions={(
                      <ActionRow>
                        <IconButton
                          isActive
                          src={Add}
                          iconAs={Icon}
                          alt="Close"
                          onClick={() => { }}
                          className="mr-2"
                        />
                      </ActionRow>
                    )}
                  />
                  <Card.Body>
                    <Card.Text>
                      <LicenseOrders data={licenseById.licenseOrder} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
    </Container>
  );
};
