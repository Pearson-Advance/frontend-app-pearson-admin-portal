import React from 'react';
import { render } from '@testing-library/react';
import { Factory } from 'rosie';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import { InstitutionsTable } from 'features/institutions/components/InstitutionsTable';

import 'features/institutions/data/__factories__';

test('render InstitutionsTable with no data', () => {
  const component = render(
    <Provider store={initializeStore()}>
      <InstitutionsTable data={[]} />
    </Provider>,
  );
  expect(component.container).toHaveTextContent('No results found');
});

test('render InstitutionsTable with data', () => {
  const data = Factory.build('institutionsList');
  const component = render(
    <Provider store={initializeStore()}>
      <InstitutionsTable data={data} />
    </Provider>,
  );
  // This should have 3 table rows, inside the table component, 1 for the header and 2 for the details.
  const tableRows = component.container.querySelectorAll('tr');

  expect(component.container).toHaveTextContent('Training Center 1');
  expect(component.container).toHaveTextContent('Training Center 2');
  expect(component.container).not.toHaveTextContent('No results found');
  expect(tableRows).toHaveLength(3);
});
