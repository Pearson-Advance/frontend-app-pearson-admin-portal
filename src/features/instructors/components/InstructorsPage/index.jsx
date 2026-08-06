import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@openedx/paragon/dist/Container';
import { Pagination } from '@openedx/paragon';

import { changeTab } from 'features/shared/data/slices';
import { TabIndex, INSTRUCTOR_INITIAL_FILTERS_STATE } from 'features/shared/data/constants';
import { fetchEligibleCourses, cancelFetchEligibleCourses } from 'features/licenses/data';
import { managedCoursesForSelect } from 'features/licenses/data/selectors';

import { Filters } from 'features/instructors/components/Filters';
import { InstructorsTable } from 'features/instructors/components/InstructorsTable';
import { getColumns } from 'features/instructors/components/InstructorsTable/columns';

import { useGetInstructorsQuery } from 'features/instructors/data/apiSlice';
import { useGetInstitutionsQuery } from 'features/institutions/data/apiSlice';

const emptyRequestResponse = {
  results: [],
  count: 0,
  numPages: 0,
  currentPage: 1,
};

const InstructorsPage = () => {
  const dispatch = useDispatch();

  const eligibleCourses = useSelector(managedCoursesForSelect);

  const { data: institutionsData = [] } = useGetInstitutionsQuery();
  const institutions = useMemo(
    () => institutionsData.map((institution) => ({
      value: institution.id,
      label: institution.name,
    })),
    [institutionsData],
  );

  const [filters, setFilters] = useState(INSTRUCTOR_INITIAL_FILTERS_STATE);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [isFilterApplied, setIsFilterApplied] = useState(true);

  const instructorsQueryArgs = useMemo(() => ({
    page,
    ...(appliedFilters || {}),
  }), [page, appliedFilters]);

  const {
    data: instructorsResponse,
    isFetching: isInstructorsFetching,
    isError: isInstructorsError,
  } = useGetInstructorsQuery(instructorsQueryArgs);

  const requestResponse = instructorsResponse ?? emptyRequestResponse;
  const {
    results = [], count = 0, numPages = 0, currentPage = 1,
  } = requestResponse;

  const COLUMNS = useMemo(() => getColumns(), []);

  const tableData = useMemo(() => {
    if (!results || !results.length) {
      return [];
    }

    return results.flatMap((instructor) => {
      if (instructor.classesDetail && instructor.classesDetail.length > 0) {
        return instructor.classesDetail.map((classItem) => ({
          ...instructor,
          masterCourseName: classItem.masterCourseName || '',
          masterCourseId: classItem.masterCourseId || '',
          className: classItem.className || '',
          classId: classItem.classId || '',
          startDate: classItem.startDate || '',
          endDate: classItem.endDate || '',
        }));
      }

      return [{
        ...instructor,
        masterCourseName: '',
        masterCourseId: '',
        className: '',
        classId: '',
        startDate: '',
        endDate: '',
      }];
    });
  }, [results]);

  const applyFilters = useCallback((nextFilters) => {
    setPage(1);
    setAppliedFilters(nextFilters);
    setIsFilterApplied(true);
  }, []);

  const handleCleanFilters = useCallback(() => {
    setFilters(INSTRUCTOR_INITIAL_FILTERS_STATE);
    setPage(1);
    setAppliedFilters(null);
    setIsFilterApplied(true);
  }, []);

  const handleApplyFilters = useCallback((newFilters) => {
    const filtersToApply = newFilters || filters;
    applyFilters(filtersToApply);
  }, [applyFilters, filters]);

  const handlePagination = useCallback((targetPage) => {
    setPage(targetPage);
  }, []);

  useEffect(() => {
    dispatch(changeTab(TabIndex.INSTRUCTORS));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEligibleCourses());
    return () => {
      dispatch(cancelFetchEligibleCourses());
    };
  }, [dispatch]);

  return (
    <Container size="xl">
      <Filters
        filters={filters}
        setFilters={setFilters}
        institutions={institutions}
        eligibleCourses={eligibleCourses}
        handleCleanFilters={handleCleanFilters}
        handleApplyFilters={handleApplyFilters}
        isFilterApplied={isFilterApplied}
        setIsFilterApplied={setIsFilterApplied}
      />
      <InstructorsTable
        data={tableData}
        count={tableData.length || count}
        columns={COLUMNS}
        isLoading={isInstructorsFetching}
        isError={isInstructorsError}
      />
      <Pagination
        paginationLabel="paginationNavigation"
        pageCount={numPages}
        currentPage={currentPage || page}
        onPageSelect={handlePagination}
      />
    </Container>
  );
};

export { InstructorsPage };
