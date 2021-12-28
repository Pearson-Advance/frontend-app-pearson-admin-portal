import React, { useEffect } from 'react';
import { Container } from '@edx/paragon';
import { LicenseTable } from 'features/licenses/components/LicenseTable';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex } from 'features/shared/data/constants';
import { useDispatch } from 'react-redux';

const LicensesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTab(TabIndex.LICENSES));
  }, [dispatch]);

  return (
    <Container className="p-4">
      <LicenseTable />
    </Container>
  );
};

export { LicensesPage };
