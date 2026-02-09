import {
  ActionRow, Button, Card, Col, Container, Icon, IconButton, Row, Spinner,
} from '@edx/paragon';
import { Add, ArrowBack } from '@edx/paragon/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal } from 'features/shared/components/Modal';
import { openLicenseOrderModal, closeLicenseOrderModal, clearLicenseOrder } from 'features/licenses/data/slices';
import { createLicenseOrder, fetchLicensebyId, editLicenseOrder } from 'features/licenses/data/thunks';
import { LicenseOrders } from 'features/licenses/components/LicenseOrders';
import { LicenseOrderForm } from 'features/licenses/components/LicenseOrderForm';
import { TabIndex } from 'features/shared/data/constants';
import { changeTab } from 'features/shared/data/slices';
import { has } from 'lodash';

const initialFormValues = {
  id: '',
  orderReference: '',
  purchasedSeats: 0,
  active: true,
};

export const LicenseDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { ordersData, Orderform, licenseById } = useSelector(state => state.licenses);
  const [fields, setFields] = useState(initialFormValues);

  const handleGoBackClick = () => {
    navigate('/licenses');
  };

  const handleCloseModal = () => {
    setFields(initialFormValues);
    dispatch(closeLicenseOrderModal());
  };

  const handleOpenModal = (orderId, orderReference = null, purchasedSeats = null, active = null) => {
    setFields(initialFormValues);
    if (orderReference != null) {
      dispatch(openLicenseOrderModal({
        orderId, orderReference, purchasedSeats, active,
      }));
    } else {
      dispatch(openLicenseOrderModal());
    }
  };

  const create = !has(Orderform.order, 'orderId');

  const handleSubmit = () => {
    if (create) {
      dispatch(
        createLicenseOrder(
          parseInt(id, 10),
          fields.orderReference,
          fields.purchasedSeats,
          fields.courseAccessDuration,
          fields.active,
        ),
      );
    } else {
      dispatch(
        editLicenseOrder(
          Orderform.order.orderId,
          fields.orderReference,
          fields.purchasedSeats,
        ),
      );
    }
  };

  useEffect(() => {
    if (!create) {
      setFields({
        orderReference: Orderform.order.orderReference,
        purchasedSeats: Orderform.order.purchasedSeats,
      });
    }
  }, [Orderform, create]);

  useEffect(() => {
    dispatch(clearLicenseOrder());
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(changeTab(TabIndex.LICENSES));
    dispatch(fetchLicensebyId(id));
  }, [dispatch, id, ordersData]);

  return (
    <Container size="xl" className="p-4">
      {!licenseById
        && (
          <div className="d-flex justify-content-center pb-4">
            <Spinner animation="border" className="mr-3" />
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
                    <p><b>Institution:</b> {licenseById.institution.name}</p>
                    <div>
                      <p><b>Courses:</b></p>
                      {licenseById.courses.map(course => <p>{(`${course.id} - ${course.displayName}`)}</p>)}
                    </div>
                    <p><b>Purchased seats:</b> {licenseById.purchasedSeats}</p>
                    <p><b>Course access duration:</b> {licenseById.courseAccessDuration} days</p>
                    <p><b>Status:</b> {licenseById.status}</p>
                    <p><b># orders:</b> {licenseById.licenseOrder.length}</p>
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
                      title={create ? 'Add order:' : `Edit order: ${Orderform.order.orderReference}`}
                      isOpen={Orderform.isOpen}
                      handleCloseModal={handleCloseModal}
                      handlePrimaryAction={handleSubmit}
                    >
                      <LicenseOrderForm
                        id={licenseById}
                        fields={fields}
                        setFields={setFields}
                        errors={Orderform.errors}
                      />
                    </Modal>
                  </Container>
                  <Card.Body>
                    <LicenseOrders data={licenseById.licenseOrder} handleOpenModal={handleOpenModal} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
    </Container>
  );
};
