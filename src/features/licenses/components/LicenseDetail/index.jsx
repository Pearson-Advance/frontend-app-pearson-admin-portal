import {
  ActionRow, Button, Card, Col, Container, Icon, IconButton, Row, Spinner,
} from '@edx/paragon';
import { Add, ArrowBack } from '@edx/paragon/icons';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router';
import { Modal } from 'features/shared/components/Modal';
import { openLicenseModal, closeLicenseModal, clearLicenseOrder } from 'features/licenses/data/slices';
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

  const handleOpenModal = (orderId, orderReference = null, purchasedSeats = null, active = null) => {
    setFields(initialFormValues);
    if (orderReference != null) {
      dispatch(openLicenseModal({
        orderId, orderReference, purchasedSeats, active,
      }));
    } else {
      dispatch(openLicenseModal());
    }
  };

  const create = !has(form.order, 'orderId');

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
          form.order.orderId,
          fields.orderReference,
          fields.purchasedSeats,
        ),
      );
    }
  };

  useEffect(() => {
    if (!create) {
      setFields({
        orderReference: form.order.orderReference,
        purchasedSeats: form.order.purchasedSeats,
      });
    }
  }, [form]);

  useEffect(() => {
    dispatch(clearLicenseOrder());
  }, [id]);

  useEffect(() => {
    dispatch(changeTab(TabIndex.LICENSES));
    dispatch(fetchLicensebyId(id));
  }, [id, ordersData]);

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
                    <p><b>Course:</b> {licenseById.course.displayName} - ({licenseById.course.id})</p>
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
                      title={create ? 'Add order:' : `Edit order: ${form.order.orderReference}`}
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
