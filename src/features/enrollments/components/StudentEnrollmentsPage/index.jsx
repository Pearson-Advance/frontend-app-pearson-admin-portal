import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';
import Container from '@openedx/paragon/dist/Container';
import {
  Pagination,
  useToggle,
  AlertModal,
  ActionRow,
  Button,
} from '@openedx/paragon';

import {
  fetchExportStudentEnrollments,
  updateEnrollmentAction,
  updateEnrollmentDate,
  updateBulkEnrollmentsAction,
} from 'features/enrollments/data';
import { useGetStudentEnrollmentsQuery } from 'features/enrollments/data/apiSlice';
import { useGetInstitutionsQuery } from 'features/institutions/data/apiSlice';
import { fetchEligibleCourses, cancelFetchEligibleCourses } from 'features/licenses/data';

import { managedCoursesForSelect } from 'features/licenses/data/selectors';

import { changeTab } from 'features/shared/data/slices';
import { updateEnrollment } from 'features/enrollments/data/slices';

import { getOrdering, removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';
import { TabIndex, EnrollmentStatus, BULK_STATUS_TEXT_BY_ACTION } from 'features/shared/data/constants';

import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import { getColumns, hideColumns } from 'features/enrollments/components/StudentEnrollmentsTable/columns';
import ModalBody from 'features/enrollments/components/StudentEnrollmentsPage/components/ModalBody';
import BulkModalBody from 'features/enrollments/components/BulkSelection/BulkModalBody';
import { Filters } from '../Filters';

import './index.scss';

const emptyRequestResponse = {
  results: [],
  count: 0,
  numPages: 0,
  currentPage: 1,
};

const initialFiltersState = {
  institution: null,
  masterCourseId: null,
  ccxName: '',
  learnerEmail: '',
  ccxAdminEmail: '',
  enrollmentStatus: '',
};

const enrollmentActionByStatus = {
  [EnrollmentStatus.PENDING]: { status: 'revoked', action: 'unenroll' },
  [EnrollmentStatus.ACTIVE]: { status: 'unenrolled', action: 'unenroll' },
  [EnrollmentStatus.INACTIVE]: { status: 'enrolled', action: 'enroll' },
  [EnrollmentStatus.EXPIRED]: { status: 'expired', action: 'extend' },
};

const StudentEnrollmentsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.enrollments.updateEnrollmentStatus.errorMessage);
  const sortBy = useSelector(state => state.page.dataTable.sortBy);
  const eligibleCourses = useSelector(managedCoursesForSelect);

  const { data: institutionsData = [] } = useGetInstitutionsQuery();
  const institutions = useMemo(
    () => institutionsData.map((institution) => ({ value: institution.id, label: institution.name })),
    [institutionsData],
  );

  const [filters, setFilters] = useState(initialFiltersState);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const [isOpen, open, close] = useToggle(false);
  const [selectedRow, setRow] = useState({});
  const [extendDate, setExtendDate] = useState('');

  const [selectedFlatRows, setSelectedFlatRows] = useState([]);
  const [selectedBulkAction, setSelectedBulkAction] = useState('');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const enrollmentsQueryArgs = useMemo(
    () => (appliedFilters
      ? { ...appliedFilters, ordering: getOrdering(sortBy), page }
      : skipToken),
    [appliedFilters, sortBy, page],
  );

  const {
    data: enrollmentsResponse,
    isFetching: isEnrollmentsFetching,
    isError: isEnrollmentsError,
  } = useGetStudentEnrollmentsQuery(enrollmentsQueryArgs);

  // RTK Query keeps the last result cached even when the query is skipped, so the
  // displayed data is gated on having applied filters. Without applied filters
  // (initial state or after clearing) the table must stay empty.
  const requestResponse = appliedFilters
    ? (enrollmentsResponse ?? emptyRequestResponse)
    : emptyRequestResponse;

  const COLUMNS = useMemo(() => getColumns({ open, setRow }), [open]);

  const selectedRowsData = useMemo(
    () => selectedFlatRows.map((row) => row.original || row),
    [selectedFlatRows],
  );

  const entry = enrollmentActionByStatus[selectedRow.status] || { status: '' };
  const { status } = entry;
  const isExtendAction = entry.action === 'extend';
  const isRevoked = status === 'revoked';

  const modalTitle = isExtendAction
    ? 'New expiration date'
    : `Are you sure you want the ${
      isRevoked ? "learner's enrollment to be" : 'learner to be'
    } ${status}?`;

  const isBulkExtendAction = selectedBulkAction === 'extend';
  const bulkModalTitle = isBulkExtendAction
    ? 'New expiration date'
    : `Are you sure you want the selected learners to be ${
      BULK_STATUS_TEXT_BY_ACTION[selectedBulkAction] || selectedBulkAction
    }?`;

  const applyFilters = useCallback((nextFilters) => {
    const hasFilters = Object.keys(removeNullOrEmptyObjectAttributes(nextFilters)).length > 0;
    setPage(1);
    setAppliedFilters(hasFilters ? nextFilters : null);
    setIsFilterApplied(true);
    setSelectedFlatRows([]);
  }, []);

  const handleCleanFilters = useCallback(() => {
    setFilters(initialFiltersState);
    setPage(1);
    setAppliedFilters(null);
    setIsFilterApplied(true);
    setSelectedFlatRows([]);
  }, []);

  const handleApplyFilters = useCallback(() => {
    applyFilters(filters);
  }, [applyFilters, filters]);

  const handleExportEnrollments = useCallback(() => {
    dispatch(fetchExportStudentEnrollments({
      ...appliedFilters,
      ordering: getOrdering(sortBy),
    }));
  }, [dispatch, appliedFilters, sortBy]);

  const handlePagination = useCallback((targetPage) => {
    setPage(targetPage);
  }, []);

  const handleReset = useCallback(() => {
    close();
    dispatch(updateEnrollment({ errorMessage: '' }));

    if (extendDate) {
      setExtendDate('');
    }
  }, [close, dispatch, extendDate]);

  const handleAction = () => {
    const enrollmentData = new FormData();
    enrollmentData.append('identifiers', selectedRow.learnerEmail);

    if (entry.action) {
      enrollmentData.append('action', entry.action);
    }

    if (entry.action === 'unenroll') {
      enrollmentData.append('allow_lab_unenroll', true);
    }

    if (isExtendAction) {
      if (!extendDate || Number.isNaN(Date.parse(extendDate))) {
        return;
      }

      const formattedDate = new Date(extendDate).toISOString();

      enrollmentData.append('date', formattedDate);
      enrollmentData.append('student_email', selectedRow.learnerEmail);
      enrollmentData.append('class_id', selectedRow.ccxId);

      dispatch(updateEnrollmentDate(enrollmentData, handleReset));
      return;
    }

    dispatch(updateEnrollmentAction(enrollmentData, selectedRow.ccxId));
    close();
  };

  const handleOpenBulkModal = useCallback((action, rowsData = []) => {
    setSelectedBulkAction(action);
    if (rowsData && rowsData.length > 0) {
      setSelectedFlatRows(rowsData);
    }
    setIsBulkModalOpen(true);
  }, []);

  const handleCloseBulkModal = () => {
    setIsBulkModalOpen(false);
    setSelectedBulkAction('');
    setExtendDate('');
  };

  const handleExecuteBulkAction = async () => {
    const isExtend = selectedBulkAction === 'extend';

    if (isExtend && (!extendDate || Number.isNaN(Date.parse(extendDate)))) {
      return;
    }

    const payload = {
      action: selectedBulkAction,
      enrollments: selectedRowsData.map((row) => ({
        learnerEmail: row.learnerEmail,
        ccxId: row.ccxId,
      })),
      ...(isExtend && { date: new Date(extendDate).toISOString() }),
    };

    setIsBulkUpdating(true);

    dispatch(
      updateBulkEnrollmentsAction(payload, () => {
        setIsBulkUpdating(false);
        handleCloseBulkModal();
        setSelectedFlatRows([]);
      }),
    );
  };

  useEffect(() => {
    dispatch(changeTab(TabIndex.ENROLLMENTS));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEligibleCourses());
    return () => {
      dispatch(cancelFetchEligibleCourses());
    };
  }, [dispatch]);

  const modalFooter = (
    <ActionRow>
      <Button variant="tertiary" onClick={handleReset}>Cancel</Button>
      <Button variant="primary" onClick={handleAction}>Submit</Button>
    </ActionRow>
  );

  const bulkModalFooter = (
    <ActionRow>
      <Button variant="tertiary" onClick={handleCloseBulkModal} disabled={isBulkUpdating}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleExecuteBulkAction} isLoading={isBulkUpdating}>
        Submit
      </Button>
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
        isLoading={isEnrollmentsFetching}
        hasActiveFilters={Boolean(appliedFilters)}
        isError={isEnrollmentsError}
        onOpenBulkModal={handleOpenBulkModal}
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

      <AlertModal
        title={bulkModalTitle}
        isOpen={isBulkModalOpen}
        onClose={handleCloseBulkModal}
        footerNode={bulkModalFooter}
        className={isBulkExtendAction ? 'hidden-overflow' : ''}
      >
        <BulkModalBody
          isExtendAction={isBulkExtendAction}
          extendDate={extendDate}
          onDateChange={setExtendDate}
          error={error}
          selectedCount={selectedRowsData.length}
          statusText={BULK_STATUS_TEXT_BY_ACTION[selectedBulkAction] || selectedBulkAction}
        />
      </AlertModal>
    </Container>
  );
};

export { StudentEnrollmentsPage };
