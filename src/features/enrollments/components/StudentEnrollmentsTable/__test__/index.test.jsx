import React from 'react';
import { Factory } from 'rosie';

import { StudentEnrollmentsTable } from 'features/enrollments/components/StudentEnrollmentsTable';
import { getColumns, hideColumns } from 'features/enrollments/components/StudentEnrollmentsTable/columns';

import 'features/enrollments/data/__factories__';
import { renderWithProvidersAndIntl } from 'test-utils';

const columnProps = {
  open: jest.fn(),
  setRow: jest.fn(),
};

test('render StudentEnrollmentsTable with no data', () => {
  const component = renderWithProvidersAndIntl(
    <StudentEnrollmentsTable
      data={[]}
      count={0}
      columns={[]}
      hideColumns={{}}
    />,
  );

  expect(component.container).toHaveTextContent('No enrollments found');
});

test('render StudentEnrollmentsTable with data', () => {
  const data = Factory.build('enrollmentsList');

  const component = renderWithProvidersAndIntl(
    <StudentEnrollmentsTable
      data={data}
      count={data.length}
      columns={getColumns(columnProps)}
      hideColumns={hideColumns}
    />,
  );

  // 1 header row + 3 enrollment rows
  const tableRows = component.container.querySelectorAll('tr');

  expect(component.container).not.toHaveTextContent('No enrollments found');
  expect(tableRows).toHaveLength(4);

  // Hidden columns
  expect(component.container).not.toHaveTextContent('Master Course ID');
  expect(component.container).not.toHaveTextContent('Ccx Id');

  // Institutions
  expect(component.container).toHaveTextContent('Training Center 1');
  expect(component.container).toHaveTextContent('Training Center 2');
  expect(component.container).toHaveTextContent('Training Center 3');

  // Emails
  expect(component.container).toHaveTextContent('admin1@example.com');
  expect(component.container).toHaveTextContent('admin2@example.com');
  expect(component.container).toHaveTextContent('admin3@example.com');
  expect(component.container).toHaveTextContent('lerner1@example.com');
  expect(component.container).toHaveTextContent('lerner2@example.com');
  expect(component.container).toHaveTextContent('lerner3@example.com');

  // Status
  expect(component.container).toHaveTextContent('Pending');
  expect(component.container).toHaveTextContent('Active');
  expect(component.container).toHaveTextContent('Inactive');

  // Date formatting
  expect(component.container).toHaveTextContent('Fri, 14 Jan 2022 16:15:10 GMT');
});

test('Check sorting columns of StudentEnrollmentsTable', () => {
  const component = renderWithProvidersAndIntl(
    <StudentEnrollmentsTable
      data={[]}
      count={0}
      columns={getColumns(columnProps)}
      hideColumns={hideColumns}
    />,
  );

  // Sortable columns: institution, master course name, admin email, learner email
  expect(component.getAllByTitle('Toggle SortBy')).toHaveLength(4);
});
