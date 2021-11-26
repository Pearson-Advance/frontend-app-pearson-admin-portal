import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@edx/paragon/dist/Container';
import { InstitutionsTable } from 'features/institutions/components/InstitutionsTable';
import { fetchInstitutions } from 'features/institutions/data';

const InstitutionsPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.institutions);

  useEffect(() => {
    dispatch(fetchInstitutions());
  }, [dispatch]);

  return (
    <Container size="xl">
      <InstitutionsTable data={data} />
    </Container>
  );
};

export { InstitutionsPage };
