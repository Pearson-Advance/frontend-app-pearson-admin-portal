import React from 'react';
import { render } from '@testing-library/react';
import { Factory } from 'rosie';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import { getColumns, hideColumns } from 'features/enrollments/components/StudentEnrollmentsTable/columns';

import '@testing-library/jest-dom/extend-expect';
import 'features/enrollments/data/__factories__';

test('render StudentEnrollmentsTable with no data', () => {
  const component = render(
    <Provider store={initializeStore()}>
      <StudentEnrollmentsTable data={[]} count={0} columns={[]} hideColumns={{}} />
    </Provider>,
  );
  expect(component.container).toHaveTextContent('No enrollments found');
});

test('render StudentEnrollmentsTable with data', () => {
  const data = Factory.build('enrollmentsList');
  const component = render(
    <Provider store={initializeStore()}>
      <StudentEnrollmentsTable data={data} count={data.length} columns={getColumns()} hideColumns={hideColumns} />
    </Provider>,
  );
  // This should have 4 table rows, inside the table component, 1 for the header and 3 for the enrollments.
  const tableRows = component.container.querySelectorAll('tr');

  expect(component.container).not.toHaveTextContent('No enrollments found');
  expect(tableRows).toHaveLength(4);
  // Check hidden columns
  expect(component.container).not.toHaveTextContent('Master Course ID');
  expect(component.container).not.toHaveTextContent('Ccx Id');
  // Check institutions
  expect(component.container).toHaveTextContent('Training Center 1');
  expect(component.container).toHaveTextContent('Training Center 2');
  expect(component.container).toHaveTextContent('Training Center 3');
  // Check emails
  expect(component.container).toHaveTextContent('admin1@example.com');
  expect(component.container).toHaveTextContent('admin2@example.com');
  expect(component.container).toHaveTextContent('admin3@example.com');
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

test('Check sorting columns of StudentEnrollmentsTable', () => {
  const component = render(
    <Provider store={initializeStore()}>
      <StudentEnrollmentsTable data={[]} count={0} columns={getColumns()} />
    </Provider>,
  );

  // The 4 Sorting columns are: institution, master course name, admin email and learner email.
  expect(component.getAllByTitle('Toggle SortBy')).toHaveLength(4);
});
