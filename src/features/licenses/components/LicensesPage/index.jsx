import React, { useEffect } from 'react';
import { Container } from '@edx/paragon';
import { List } from 'features/licenses/components/List';
import { changeTab } from 'features/shared/data/slices';
import { TabIndex } from 'features/shared/data/constants';
import { useDispatch } from 'react-redux';

const LicensesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTab(TabIndex.LICENSES))
  }, [])


  return (
    <Container size="xl" className="pt-4">
      <List />
    </Container>
  );
};

export { LicensesPage };