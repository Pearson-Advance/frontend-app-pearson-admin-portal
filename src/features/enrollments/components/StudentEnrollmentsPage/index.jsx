import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@edx/paragon/dist/Container';
import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import {
  fetchStudentEnrollments,
  fetchExportStudentEnrollments,
  updateEnrollmentAction,
} from 'features/enrollments/data';
import { fetchInstitutions } from 'features/institutions/data';
import { fetchEligibleCourses } from 'features/licenses/data';
import { allInstitutionsForSelect } from 'features/institutions/data/selector';
import { managedCoursesForSelect } from 'features/licenses/data/selectors';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex } from 'features/shared/data/constants';
import {
  Pagination,
  useToggle,
  AlertModal,
  ActionRow,
  Button,
} from '@edx/paragon';
import { getOrdering } from 'features/shared/data/utils';
import { getColumns, hideColumns } from 'features/enrollments/components/StudentEnrollmentsTable/columns';
import { Filters } from '../Filters';

const initialFiltersState = {
  institution: null,
  masterCourseId: null,
  learnerEmail: '',
  ccxAdminEmail: '',
  enrollmentStatus: '',
};

const StudentEnrollmentsPage = () => {
  const dispatch = useDispatch();
  const requestResponse = useSelector(state => state.enrollments.requestResponse);
  const sortBy = useSelector(state => state.page.dataTable.sortBy);
  const pageTab = useSelector(state => state.page.tab);
  const [filters, setFilters] = useState(initialFiltersState);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const institutions = useSelector(allInstitutionsForSelect);
  const eligibleCourses = useSelector(managedCoursesForSelect);
  const [isOpen, open, close] = useToggle(false);
  const [selectedRow, setRow] = useState({});

  const enrollmentData = new FormData();
  enrollmentData.append('identifiers', selectedRow.learnerEmail);

  const COLUMNS = useMemo(() => getColumns({ open, setRow }), [open]);

  let status = '';

  switch (selectedRow.status) {
    case 'Pending':
      status = 'revoked';
      enrollmentData.append('action', 'unenroll');
      break;
    case 'Active':
      status = 'unenrolled';
      enrollmentData.append('action', 'unenroll');
      break;
    case 'Inactive':
      status = 'enrolled';
      enrollmentData.append('action', 'enroll');
      break;
    default:
      status = '';
  }

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

  const handleAction = () => {
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
        title={`Are you sure you want the ${status === 'revoked' ? 'learner\'s enrollment to be' : 'learner to be'} ${status}?`}
        isOpen={isOpen}
        onClose={close}
        footerNode={(
          <ActionRow>
            <Button variant="tertiary" onClick={close}>cancel</Button>
            <Button variant="primary" onClick={handleAction}>
              Submit
            </Button>
          </ActionRow>
        )}
      >
        <p>
          Learner with email <b>{selectedRow.learnerEmail}</b> will be <b>{status}</b> {status === 'enrolled' ? 'to' : 'from'} <b>{selectedRow.ccxName}</b> course.
        </p>
      </AlertModal>
    </Container>
  );
};

export { StudentEnrollmentsPage };
