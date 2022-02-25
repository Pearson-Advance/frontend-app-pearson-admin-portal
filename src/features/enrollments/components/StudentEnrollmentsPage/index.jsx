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
  const { data } = useSelector(state => state.enrollments);
  const [filters, setFilters] = useState(initialFiltersState);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const institutions = useSelector(allInstitutionsForSelect);
  const managedCourses = useSelector(managedCoursesForSelect);

  const handleCleanFilters = () => {
    setFilters(initialFiltersState);
    dispatch(fetchStudentEnrollments());
    setIsFilterApplied(true);
  };

  const handleApplyFilters = () => {
    dispatch(fetchStudentEnrollments(filters));
    setIsFilterApplied(true);
  };

  const handleExportEnrollments = () => {
    dispatch(fetchExportStudentEnrollments(filters));
  };

  useEffect(() => {
    dispatch(changeTab(TabIndex.ENROLLMENTS));
    dispatch(fetchStudentEnrollments());
    dispatch(fetchInstitutions());
    dispatch(fetchLicenseManageCourses());
  }, [dispatch]);

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
      <StudentEnrollmentsTable data={data} />
    </Container>
  );
};

export { StudentEnrollmentsPage };
