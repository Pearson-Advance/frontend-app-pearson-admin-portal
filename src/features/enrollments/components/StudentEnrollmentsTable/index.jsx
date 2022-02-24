import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from '@edx/paragon/dist/DataTable';
import {
  Row, Col, Toast, useToggle, AlertModal, ActionRow, Button,
} from '@edx/paragon';
import { getColumns } from './columns';
import { useDispatch } from 'react-redux';
import { deleteAction, unenrollAction, enrollAction } from '../../data/thunks'; //CORREGIR

const StudentEnrollmentsTable = ({ data }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isOpenDelete, openDelete, closeDelete] = useToggle(false);
  const [isOpenUnenroll, openUnenroll, closeUnenroll] = useToggle(false);
  const [isOpenEnroll, openEnroll, closeEnroll] = useToggle(false);
  const [selectedRow, setRow] = useState({});

  const Data = {
    course_id: selectedRow.ccxId,
    username: selectedRow.learnerEmail,
  };

  const COLUMNS = useMemo(() => getColumns({ openDelete, openUnenroll, openEnroll, setRow }), []); //eslint-disable-line react-hooks/exhaustive-deps
  let status = 'Deleted';
  if (selectedRow.status === 'Pending') { status = 'Deleted' }
  if (selectedRow.status === 'Active') { status = 'Unenrolled' }
  if (selectedRow.status === 'Inactive') { status = 'Enrolled' }

  return (
    <Row className="justify-content-center my-4 border-gray-300 bg-light-100 my-3">
      <Col xs={12}>
        <DataTable
          itemCount={data.length}
          data={data}
          columns={COLUMNS}
        >
          <DataTable.Table />
          <DataTable.EmptyTable content="No enrollments found." />
          <DataTable.TableFooter />
        </DataTable>
        <Toast
          onClose={() => setShow(false)}
          show={show}
        >
          Successfully {status} !
        </Toast>
        <AlertModal
          title='Are you sure you want to delete?'
          isOpen={isOpenDelete}
          onClose={close}
          footerNode={(
            <ActionRow>
              <Button variant="tertiary" onClick={closeDelete}>cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShow(true);
                  dispatch(deleteAction(Data));
                  closeDelete()
                }}>
                Submit
              </Button>
            </ActionRow>
          )}>
          <p>
            Once submitted the user will be deleted.
          </p>
        </AlertModal>
        <AlertModal
          title='Are you sure you want to unenroll?'
          isOpen={isOpenUnenroll}
          onClose={close}
          footerNode={(
            <ActionRow>
              <Button variant="tertiary" onClick={closeUnenroll}>cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShow(true);
                  dispatch(unenrollAction(Data));
                  closeUnenroll()
                }}>
                Submit
              </Button>
            </ActionRow>
          )}>
          <p>
            Once submitted the user will be unenrolled from the CCX.
          </p>
        </AlertModal>
        <AlertModal
          title='Are you sure you want to enroll?'
          isOpen={isOpenEnroll}
          onClose={close}
          footerNode={(
            <ActionRow>
              <Button variant="tertiary" onClick={closeEnroll}>cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShow(true);
                  dispatch(enrollAction(Data));
                  closeEnroll()
                }}>
                Submit
              </Button>
            </ActionRow>
          )}>
          <p>
            Once submitted the user will be enrolled.
          </p>
        </AlertModal>
      </Col>
    </Row>
  );
};

StudentEnrollmentsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape([])),
};

StudentEnrollmentsTable.defaultProps = {
  data: [],
};

export { StudentEnrollmentsTable };
