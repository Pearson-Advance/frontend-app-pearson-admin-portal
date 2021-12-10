import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@edx/paragon/dist/Container';
import { InstitutionAdminsTable } from 'features/institutionAdmins/components/InstitutionAdminsTable';
import { fetchInstitutionAdmins, selectAdmins } from 'features/institutionAdmins/data';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex } from 'features/shared/data/constants';

const InstitutionAdminsPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectAdmins);

  useEffect(() => {
    dispatch(changeTab(TabIndex.ADMINS));
    dispatch(fetchInstitutionAdmins());
  }, [dispatch]);

  return (
    <Container size="xl">
      <InstitutionAdminsTable data={data} />
    </Container>
  );
};

export { InstitutionAdminsPage };
