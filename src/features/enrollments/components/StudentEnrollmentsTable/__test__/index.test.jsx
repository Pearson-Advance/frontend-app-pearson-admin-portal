import React from 'react';
import { Factory } from 'rosie';
import { screen, fireEvent } from '@testing-library/react';

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
      hasActiveFilters
    />,
  );

  expect(component.container).toHaveTextContent('No enrollments found');
});

test('render StudentEnrollmentsTable prompts to apply a filter when none is active', () => {
  const component = renderWithProvidersAndIntl(
    <StudentEnrollmentsTable
      data={[]}
      count={0}
      columns={[]}
      hideColumns={{}}
    />,
  );

  expect(component.container).toHaveTextContent('Set your filters and click search to view the results.');
  expect(component.container).not.toHaveTextContent('No enrollments found');
});

test('render StudentEnrollmentsTable shows an error message when the request fails', () => {
  const component = renderWithProvidersAndIntl(
    <StudentEnrollmentsTable
      data={[]}
      count={0}
      columns={[]}
      hideColumns={{}}
      hasActiveFilters
      isError
    />,
  );

  expect(component.container).toHaveTextContent('An error occurred while loading enrollments. Please try again.');
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

  // Checkbox controls exist for each row
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes.length).toBeGreaterThanOrEqual(data.length);

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

test('calls onOpenBulkModal when a bulk action is selected in StudentEnrollmentsTable', () => {
  const data = Factory.build('enrollmentsList');
  const onOpenBulkModal = jest.fn();

  const component = renderWithProvidersAndIntl(
    <StudentEnrollmentsTable
      data={data}
      count={data.length}
      columns={getColumns(columnProps)}
      hideColumns={hideColumns}
      hasActiveFilters
      onOpenBulkModal={onOpenBulkModal}
    />,
  );

  // Select the first row checkbox
  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  // Locate the Actions dropdown trigger in TableControlBar
  const actionsDropdown = component.container.querySelector('#bulk-actions-dropdown-toggle');
  expect(actionsDropdown).toBeInTheDocument();
  expect(actionsDropdown).not.toBeDisabled();

  // Open dropdown and click an action option
  fireEvent.click(actionsDropdown);
  const revokeOption = screen.getByText('Revoke');
  fireEvent.click(revokeOption);

  // Verify callback execution with selected action & row payload
  expect(onOpenBulkModal).toHaveBeenCalledTimes(1);
  expect(onOpenBulkModal).toHaveBeenCalledWith('revoke', expect.any(Array));
});
