import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@edx/paragon/dist/Container';
import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import { fetchStudentEnrollments } from 'features/enrollments/data';
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
  const institutions = useSelector(allInstitutionsForSelect);
  const managedCourses = useSelector(managedCoursesForSelect);

  const handleCleanFilters = () => {
    setFilters(initialFiltersState);
    dispatch(fetchStudentEnrollments());
  };

  const handleApplyFilters = () => {
    dispatch(fetchStudentEnrollments(filters));
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
        institutions={institutions}
        managedCourses={managedCourses}
        handleCleanFilters={handleCleanFilters}
        handleApplyFilters={handleApplyFilters}
      />
      <StudentEnrollmentsTable data={data} />
    </Container>
  );
};

export { StudentEnrollmentsPage };
