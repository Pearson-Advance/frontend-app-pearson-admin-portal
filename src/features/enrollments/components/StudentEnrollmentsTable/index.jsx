import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DataTable from '@edx/paragon/dist/DataTable';
import {
  Row, Col, Toast, useToggle, AlertModal, ActionRow, Button,
} from '@edx/paragon';
import { getColumns } from './columns';
import { useDispatch } from 'react-redux';
import { unenrollAction, enrollAction } from '../../data/thunks'; //CORREGIR
import { fetchStudentEnrollments } from 'features/enrollments/data';
import { StudentEnrollmentsPage } from 'features/enrollments';

const StudentEnrollmentsTable = ({ data }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  // const [isOpenDelete, openDelete, closeDelete] = useToggle(false);
  const [isOpenUnenroll, openUnenroll, closeUnenroll] = useToggle(false);
  // const [isOpenEnroll, openEnroll, closeEnroll] = useToggle(false);
  const [selectedRow, setRow] = useState({});
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const unenrollData = {
    course_id: selectedRow.ccxId,
    username: selectedRow.learnerEmail,
  };

  const EnrollData = {
    course_id: selectedRow.ccxId,
    username: selectedRow.learnerEmail,
  }
  const initialFiltersState = {
    institution: null,
    masterCourseId: null,
    learnerEmail: '',
    ccxCoachEmail: '',
    enrollmentStatus: '',
  };

  const handleApplyFilters = () => {
    dispatch(fetchStudentEnrollments(initialFiltersState));
    setIsFilterApplied(true);
  };

  const COLUMNS = useMemo(() => getColumns({ openUnenroll, setRow }), []); //eslint-disable-line react-hooks/exhaustive-deps
  let status = 'Deleted';
  if (selectedRow.status === 'Pending') { status = 'Deleted' };
  if (selectedRow.status === 'Active') { status = 'Unenrolled' };
  if (selectedRow.status === 'Inactive') { status = 'Enrolled' };

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
          isOpen={isOpenUnenroll}
          onClose={closeUnenroll}
          footerNode={(
            <ActionRow>
              <Button variant="tertiary" onClick={closeUnenroll}>cancel</Button>
              <Button
                variant="primary"
                isFilterApplied={isFilterApplied}
                onClick={() => {
                  setShow(true);
                  dispatch(unenrollAction(unenrollData));
                  handleApplyFilters();
                  closeUnenroll();
                }}>
                Submit
              </Button>
            </ActionRow>
          )}>
          <p>
            Once submitted the user will be deleted.
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
