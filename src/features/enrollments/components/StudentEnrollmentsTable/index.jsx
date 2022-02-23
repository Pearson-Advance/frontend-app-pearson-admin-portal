import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from '@edx/paragon/dist/DataTable';
import {
  Row, Col, Toast, useToggle, AlertModal, ActionRow, Button,
} from '@edx/paragon';
import { getColumns } from './columns';
import { useDispatch } from 'react-redux';
import { unenrollAction } from '../../data/thunks'; //CORREGIR

const StudentEnrollmentsTable = ({ data }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isOpen, open, close] = useToggle(false)
  const [selectedRow, setRow] = useState({});

  const unenrollData = {
    course_id: selectedRow.ccxId,
    username: selectedRow.learnerEmail,
  };

  const COLUMNS = useMemo(() => getColumns({ open, setRow }), []); //eslint-disable-line react-hooks/exhaustive-deps

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
          Successfully Unenrolled !
        </Toast>
        <AlertModal
          title='Are you sure you want to unenroll?'
          isOpen={isOpen}
          onClose={close}
          footerNode={(
            <ActionRow>
              <Button variant="tertiary" onClick={close}>cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShow(true);
                  dispatch(unenrollAction(unenrollData));
                  close()
                }}>
                Submit
              </Button>
            </ActionRow>
          )}>
          <p>
            Once submitted the user will be unenrolled from the course.
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
