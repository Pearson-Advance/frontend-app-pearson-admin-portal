import React from 'react';
import { render } from '@testing-library/react';
import { Factory } from 'rosie';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';

import '@testing-library/jest-dom/extend-expect';
import 'features/enrollments/data/__factories__';

test('render StudentEnrollmentsTable with no data', () => {
  const component = render(
    <Provider store={initializeStore()}>
      <StudentEnrollmentsTable data={[]} />
    </Provider>,
  );
  expect(component.container).toHaveTextContent('No enrollments found');
});

test('render StudentEnrollmentsTable with data', () => {
  const data = Factory.build('enrollmentsList');
  const component = render(
    <Provider store={initializeStore()}>
      <StudentEnrollmentsTable data={data} />
    </Provider>,
  );
  // This should have 4 table rows, inside the table component, 1 for the header and 3 for the enrollments.
  const tableRows = component.container.querySelectorAll('tr');

  expect(component.container).not.toHaveTextContent('No enrollments found');
  expect(tableRows).toHaveLength(4);
  // Check institutions
  expect(component.container).toHaveTextContent('Training Center 1');
  expect(component.container).toHaveTextContent('Training Center 2');
  expect(component.container).toHaveTextContent('Training Center 3');
  // Check emails
  expect(component.container).toHaveTextContent('coach1@example.com');
  expect(component.container).toHaveTextContent('coach2@example.com');
  expect(component.container).toHaveTextContent('coach3@example.com');
  expect(component.container).toHaveTextContent('lerner1@example.com');
  expect(component.container).toHaveTextContent('lerner2@example.com');
  expect(component.container).toHaveTextContent('lerner3@example.com');
  // Check if the table has all available status
  expect(component.container).toHaveTextContent('Pending');
  expect(component.container).toHaveTextContent('Active');
  expect(component.container).toHaveTextContent('Inactive');
  // Check datetime is formatted.
  expect(component.container).toHaveTextContent('Fri, 14 Jan 2022 16:15:10 GMT');
});