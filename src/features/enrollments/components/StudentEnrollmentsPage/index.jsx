import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@openedx/paragon/dist/Container';
import {
  Pagination,
  useToggle,
  AlertModal,
  ActionRow,
  Button,
} from '@openedx/paragon';

import {
  fetchStudentEnrollments,
  fetchExportStudentEnrollments,
  updateEnrollmentAction,
  updateEnrollmentDate,
} from 'features/enrollments/data';
import { fetchInstitutions } from 'features/institutions/data';
import { fetchEligibleCourses } from 'features/licenses/data';

import { allInstitutionsForSelect } from 'features/institutions/data/selector';
import { managedCoursesForSelect } from 'features/licenses/data/selectors';

import { changeTab } from 'features/shared/data/slices';
import { updateEnrollment } from 'features/enrollments/data/slices';

import { getOrdering } from 'features/shared/data/utils';
import { TabIndex, EnrollmentStatus } from 'features/shared/data/constants';

import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import { getColumns, hideColumns } from 'features/enrollments/components/StudentEnrollmentsTable/columns';
import ModalBody from 'features/enrollments/components/StudentEnrollmentsPage/components/ModalBody';
import { Filters } from '../Filters';

import './index.scss';

const initialFiltersState = {
  institution: null,
  masterCourseId: null,
  learnerEmail: '',
  ccxAdminEmail: '',
  enrollmentStatus: '',
};

const StudentEnrollmentsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.enrollments.updateEnrollmentStatus.errorMessage);
  const requestResponse = useSelector(state => state.enrollments.requestResponse);
  const sortBy = useSelector(state => state.page.dataTable.sortBy);
  const pageTab = useSelector(state => state.page.tab);
  const institutions = useSelector(allInstitutionsForSelect);
  const eligibleCourses = useSelector(managedCoursesForSelect);

  const [filters, setFilters] = useState(initialFiltersState);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [isOpen, open, close] = useToggle(false);
  const [selectedRow, setRow] = useState({});
  const [extendDate, setExtendDate] = useState('');

  const enrollmentData = new FormData();
  enrollmentData.append('identifiers', selectedRow.learnerEmail);

  const COLUMNS = useMemo(() => getColumns({ open, setRow }), [open]);

  const statusMap = {
    [EnrollmentStatus.PENDING]: { status: 'revoked', action: 'unenroll' },
    [EnrollmentStatus.ACTIVE]: { status: 'unenrolled', action: 'unenroll' },
    [EnrollmentStatus.INACTIVE]: { status: 'enrolled', action: 'enroll' },
    [EnrollmentStatus.EXPIRED]: { status: 'expired', action: 'extend' },
  };

  const entry = statusMap[selectedRow.status] || { status: '' };
  const { status } = entry;

  if (entry.action) {
    enrollmentData.append('action', entry.action);
  }

  const isExtendAction = enrollmentData.get('action') === 'extend';
  const isRevoked = status === 'revoked';

  const modalTitle = isExtendAction
    ? 'New expiration date'
    : `Are you sure you want the ${
      isRevoked ? "learner's enrollment to be" : 'learner to be'
    } ${status}?`;

  const handleCleanFilters = () => {
    setFilters(initialFiltersState);
    dispatch(fetchStudentEnrollments({ ordering: getOrdering(sortBy) }));
    setIsFilterApplied(true);
  };

  const handleApplyFilters = () => {
    dispatch(fetchStudentEnrollments({
      ...filters,
      ordering: getOrdering(sortBy),
    }));
    setIsFilterApplied(true);
  };

  const handleExportEnrollments = () => {
    dispatch(fetchExportStudentEnrollments({
      ...filters,
      ordering: getOrdering(sortBy),
    }));
  };

  const handlePagination = (targetPage) => {
    dispatch(fetchStudentEnrollments({
      ...filters,
      ordering: getOrdering(sortBy),
      page: targetPage,
    }));
  };

  const handleReset = () => {
    close();
    dispatch(updateEnrollment({ errorMessage: '' }));

    if (extendDate) {
      setExtendDate('');
    }
  };

  const handleAction = () => {
    if (isExtendAction) {
      if (!extendDate || Number.isNaN(Date.parse(extendDate))) {
        return;
      }

      const formattedDate = new Date(extendDate).toISOString();

      enrollmentData.append('date', formattedDate);
      enrollmentData.append('student_email', selectedRow.learnerEmail);
      enrollmentData.append('class_id', selectedRow.ccxId);

      dispatch(updateEnrollmentDate(enrollmentData, selectedRow.ccxId, handleReset));
      dispatch(fetchStudentEnrollments({
        ...filters,
        ordering: getOrdering(sortBy),
      }));
      return;
    }

    dispatch(
      updateEnrollmentAction(
        enrollmentData,
        {
          ...filters,
          ordering: getOrdering(sortBy),
          page: requestResponse.currentPage,
        },
        selectedRow.ccxId,
      ),
    );
    close();
  };

  useEffect(() => {
    if (TabIndex.ENROLLMENTS !== pageTab) { dispatch(changeTab(TabIndex.ENROLLMENTS)); }

    dispatch(fetchStudentEnrollments({
      ...filters,
      ordering: getOrdering(sortBy),
    }));
    dispatch(fetchInstitutions());
    dispatch(fetchEligibleCourses());
  }, [dispatch, sortBy, filters, pageTab]);

  const modalFooter = (
    <ActionRow>
      <Button variant="tertiary" onClick={handleReset}>Cancel</Button>
      <Button variant="primary" onClick={handleAction}>Submit</Button>
    </ActionRow>
  );

  return (
    <Container>
      <Filters
        filters={filters}
        setFilters={setFilters}
        isFilterApplied={isFilterApplied}
        setIsFilterApplied={setIsFilterApplied}
        institutions={institutions}
        eligibleCourses={eligibleCourses}
        handleCleanFilters={handleCleanFilters}
        handleApplyFilters={handleApplyFilters}
        handleExportEnrollments={handleExportEnrollments}
      />
      <StudentEnrollmentsTable
        data={requestResponse.results}
        count={requestResponse.count}
        columns={COLUMNS}
        hideColumns={hideColumns}
      />
      <Pagination
        paginationLabel="paginationNavigation"
        pageCount={requestResponse.numPages}
        currentPage={requestResponse.currentPage}
        onPageSelect={handlePagination}
      />
      <AlertModal
        title={modalTitle}
        isOpen={isOpen}
        onClose={handleReset}
        footerNode={modalFooter}
        className={isExtendAction ? 'hidden-overflow' : ''}
      >
        <ModalBody
          isExtendAction={isExtendAction}
          extendDate={extendDate}
          onDateChange={setExtendDate}
          error={error}
          selectedRow={selectedRow}
          status={status}
        />
      </AlertModal>
    </Container>
  );
};

export { StudentEnrollmentsPage };
