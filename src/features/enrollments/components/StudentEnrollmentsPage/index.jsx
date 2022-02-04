import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@edx/paragon/dist/Container';
import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import { fetchStudentEnrollments } from 'features/enrollments/data';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex } from 'features/shared/data/constants';

const StudentEnrollmentsPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.enrollments); // state => state.institutions

  useEffect(() => {
    dispatch(changeTab(TabIndex.ENROLLMENTS));
    dispatch(fetchStudentEnrollments());
  }, [dispatch]);

  return (
    <Container>
      <StudentEnrollmentsTable data={data} />
    </Container>
  );
};

export { StudentEnrollmentsPage };
