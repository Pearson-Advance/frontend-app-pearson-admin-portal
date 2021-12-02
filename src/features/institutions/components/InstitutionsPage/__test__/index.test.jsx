import React from 'react';
import { render } from '@testing-library/react';
import { InstitutionsPage } from 'features/institutions/components/InstitutionsPage';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

const mockLocationSearch = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    search: mockLocationSearch,
  }),
}));

test('render InstitutionsPage component', () => {
  const component = render(
    <Provider store={initializeStore()}>
      <InstitutionsPage data={[]} />
    </Provider>,
  );

  expect(component.container.querySelectorAll('table')).toHaveLength(1);
});
