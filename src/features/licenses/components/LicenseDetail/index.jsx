import {
  ActionRow, Button, Card, Col, Container, Icon, IconButton, Row, Spinner,
} from '@edx/paragon';
import { Add, ArrowBack } from '@edx/paragon/icons';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router';
import { Modal } from 'features/shared/components/Modal';
import { openLicenseModal, closeLicenseModal } from 'features/licenses/data/slices';
import { createLicenseOrder, fetchLicensebyId } from 'features/licenses/data/thunks';
import { LicenseOrders } from 'features/licenses/components/LicenseOrders';
import { LicenseOrderForm } from 'features/licenses/components/LicenseOrderForm';

const initialFormValues = {
  id: '',
  orderReference: '',
  purchasedSeats: 0,
  courseAccessDuration: 180,
  active: true,
};

export const LicenseDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { ordersData, form, licenseById } = useSelector(state => state.licenses);
  const [fields, setFields] = useState(initialFormValues);

  const handleGoBackClick = () => {
    history.push('/licenses');
  };

  const handleCloseModal = () => {
    setFields(initialFormValues);
    dispatch(closeLicenseModal());
  };

  const handleOpenModal = () => {
    setFields(initialFormValues);
    dispatch(openLicenseModal());
  };

  const handleSubmit = () => {
    dispatch(
      createLicenseOrder(
        { id: parseInt(id, 10) },
        fields.orderReference,
        fields.purchasedSeats,
        fields.courseAccessDuration,
        fields.active,
      ),
    );
  };

  useEffect(() => {
    dispatch(fetchLicensebyId(id));
  }, [id, ordersData]);

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
                          onClick={handleOpenModal}
                          className="mr-2"
                        />
                      </ActionRow>
                    )}
                  />
                  <Container size="xl">
                    <Modal
                      title="Add order"
                      isOpen={form.isOpen}
                      handleCloseModal={handleCloseModal}
                      handlePrimaryAction={handleSubmit}
                    >
                      <LicenseOrderForm
                        id={licenseById}
                        fields={fields}
                        setFields={setFields}
                        errors={form.errors}
                      />
                    </Modal>
                  </Container>

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
