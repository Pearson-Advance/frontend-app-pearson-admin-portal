import React from 'react';
import { render } from '@testing-library/react';
import { Factory } from 'rosie';
import { InstitutionsTable } from 'features/institutions/components/InstitutionsTable';

import '@testing-library/jest-dom/extend-expect';
import 'features/institutions/data/__factories__';

test('render InstitutionsTable with no data', () => {
  const component = render(<InstitutionsTable data={[]} />);

  expect(component.container).toHaveTextContent('No results found');
});

test('render InstitutionsTable with data', () => {
  const data = Factory.build('institutionsList');
  const component = render(<InstitutionsTable data={data} />);
  // This should have 3 table rows, inside the table component, 1 for the header and 2 for the details.
  const tableRows = component.container.querySelectorAll('tr');

  expect(component.container).toHaveTextContent('Training Center 1');
  expect(component.container).toHaveTextContent('Training Center 2');
  expect(component.container).not.toHaveTextContent('No results found');
  expect(tableRows).toHaveLength(3);
});
