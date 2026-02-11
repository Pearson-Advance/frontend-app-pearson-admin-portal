import React from 'react';
import { Factory } from 'rosie';

import { InstitutionAdminsTable } from 'features/institutionAdmins/components/InstitutionAdminsTable';
import 'features/institutionAdmins/data/__factories__';

import { renderWithProvidersAndIntl } from 'test-utils';

test('render InstitutionAdminsTable with no data', () => {
  const component = renderWithProvidersAndIntl(
    <InstitutionAdminsTable data={[]} />,
  );
  expect(component.container).toHaveTextContent('No results found');
});

test('render InstitutionAdminsTable with data', () => {
  const data = Factory.build('adminList');

  const component = renderWithProvidersAndIntl(
    <InstitutionAdminsTable data={data} />,
  );
  // This should have 3 table rows, inside the table component, 1 for the header and 2 for the details.
  const tableRows = component.container.querySelectorAll('tr');

  expect(component.container).toHaveTextContent('user1@example.com');
  expect(component.container).toHaveTextContent('user2@example.com');
  expect(component.container).not.toHaveTextContent('No results found');
  expect(tableRows).toHaveLength(3);
});
