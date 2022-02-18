import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { StudentEnrollmentsPage } from 'features/enrollments/components/StudentEnrollmentsPage';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

let store;
let component;

describe('Test suite for StudentEnrollmentsPage component.', () => {
  beforeEach(() => {
    store = initializeStore();

    component = render(
      <Provider store={store}>
        <StudentEnrollmentsPage />
      </Provider>,
    );
  });

  test('render StudentEnrollmentsPage component', () => {
    expect(component.container.querySelectorAll('table')).toHaveLength(1);
  });

  test('render Pagination component', () => {
    screen.getByLabelText('paginationNavigation');
  });
});
