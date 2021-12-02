import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@edx/paragon/dist/Container';
import { InstitutionsTable } from 'features/institutions/components/InstitutionsTable';
import { fetchInstitutions } from 'features/institutions/data';
import { useLocation } from 'react-router';
import { Filters } from 'features/institutions/components/Filters';

const InstitutionsPage = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.institutions);
  const params = new URLSearchParams(search);

  useEffect(() => {
    dispatch(fetchInstitutions(params.get('search'), params.get('active'), params.get('name')));
  }, [dispatch, search]);

  return (
    <Container size="xl">
      <Filters />
      <InstitutionsTable data={data} />
    </Container>
  );
};

export { InstitutionsPage };
