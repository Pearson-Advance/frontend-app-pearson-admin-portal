import React from 'react';
import { render } from '@testing-library/react';
import { InstitutionsPage } from 'features/institutions/components/InstitutionsPage';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

test('render InstitutionsPage component', () => {
  const component = render(
    <Provider store={initializeStore()}>
      <InstitutionsPage data={[]} />
    </Provider>,
  );

  expect(component.container.querySelectorAll('table')).toHaveLength(1);
});
