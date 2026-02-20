import React from 'react';
import { Factory } from 'rosie';

import { InstitutionsTable } from 'features/institutions/components/InstitutionsTable';
import 'features/institutions/data/__factories__';

import { renderWithProvidersAndIntl } from 'test-utils';

test('render InstitutionsTable with no data', () => {
  const component = renderWithProvidersAndIntl(<InstitutionsTable data={[]} />);

  expect(component.container).toHaveTextContent('No results found');
});

test('render InstitutionsTable with data', () => {
  const data = Factory.build('institutionsList');
  // This should have 3 table rows, inside the table component, 1 for the header and 2 for the details.
  const component = renderWithProvidersAndIntl(<InstitutionsTable data={data} />);
  const tableRows = component.container.querySelectorAll('tr');

  expect(component.container).toHaveTextContent('Training Center 1');
  expect(component.container).toHaveTextContent('Training Center 2');
  expect(component.container).toHaveTextContent('uuid-12345 1');
  expect(component.container).toHaveTextContent('uuid-12345 2');
  expect(component.container).not.toHaveTextContent('No results found');
  expect(tableRows).toHaveLength(3);
});

test('Render InstitutionsTable with expected columns.', () => {
  const data = Factory.build('institutionsList');
  const component = renderWithProvidersAndIntl(<InstitutionsTable data={data} />);

  const tableHeadRows = component.container.querySelectorAll('table thead tr');
  const tableHeadRow = tableHeadRows[0];

  expect(tableHeadRow).toHaveTextContent('ID');
  expect(tableHeadRow).toHaveTextContent('Name');
  expect(tableHeadRow).toHaveTextContent('Short name');
  expect(tableHeadRow).toHaveTextContent('External ID');
  expect(tableHeadRow).toHaveTextContent('Active');
  expect(tableHeadRow).toHaveTextContent('Actions');
  expect(tableHeadRow.children).toHaveLength(6);
});
