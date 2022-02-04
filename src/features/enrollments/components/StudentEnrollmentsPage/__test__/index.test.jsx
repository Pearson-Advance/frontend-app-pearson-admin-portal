import React from 'react';
import {
  render,
} from '@testing-library/react';
import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

let store;
let component;

describe('Test suite for StudentEnrollmentsPage component.', () => {
  beforeEach(() => {
    store = initializeStore();

    component = render(
      <Provider store={store}>
        <StudentEnrollmentsTable data={[]} />
      </Provider>,
    );
  });

  test('render StudentEnrollmentsPage component', () => {
    expect(component.container.querySelectorAll('table')).toHaveLength(1);
  });
});
