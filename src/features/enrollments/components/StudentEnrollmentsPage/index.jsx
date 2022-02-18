import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@edx/paragon/dist/Container';
import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import { fetchStudentEnrollments, fetchExportStudentEnrollments } from 'features/enrollments/data';
import { fetchInstitutions } from 'features/institutions/data';
import { fetchLicenseManageCourses } from 'features/licenses/data';
import { allInstitutionsForSelect } from 'features/institutions/data/selector';
import { managedCoursesForSelect } from 'features/licenses/data/selectors';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex } from 'features/shared/data/constants';
import { Pagination } from '@edx/paragon';
import { getOrdering } from 'features/shared/data/utils';
import { Filters } from '../Filters';

const initialFiltersState = {
  institution: null,
  masterCourseId: null,
  learnerEmail: '',
  ccxCoachEmail: '',
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
  const managedCourses = useSelector(managedCoursesForSelect);

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

  useEffect(() => {
    if (TabIndex.ENROLLMENTS !== pageTab) { dispatch(changeTab(TabIndex.ENROLLMENTS)); }

    dispatch(fetchStudentEnrollments({
      ...filters,
      ordering: getOrdering(sortBy),
    }));
    dispatch(fetchInstitutions());
    dispatch(fetchLicenseManageCourses());
  }, [dispatch, sortBy]);

  return (
    <Container>
      <Filters
        filters={filters}
        setFilters={setFilters}
        isFilterApplied={isFilterApplied}
        setIsFilterApplied={setIsFilterApplied}
        institutions={institutions}
        managedCourses={managedCourses}
        handleCleanFilters={handleCleanFilters}
        handleApplyFilters={handleApplyFilters}
        handleExportEnrollments={handleExportEnrollments}
      />
      <StudentEnrollmentsTable data={requestResponse.results} count={requestResponse.count} />
      <Pagination
        paginationLabel="paginationNavigation"
        pageCount={requestResponse.numPages}
        currentPage={requestResponse.currentPage}
        onPageSelect={handlePagination}
      />
    </Container>
  );
};

export { StudentEnrollmentsPage };
