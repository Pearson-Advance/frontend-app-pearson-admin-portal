import React from 'react';
import { render } from '@testing-library/react';
import { Factory } from 'rosie';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import { InstitutionAdminsTable } from 'features/institutionAdmins/components/InstitutionAdminsTable';

import '@testing-library/jest-dom/extend-expect';
import 'features/institutionAdmins/data/__factories__';

test('render InstitutionAdminsTable with no data', () => {
  const component = render(
    <Provider store={initializeStore()}>
      <InstitutionAdminsTable data={[]} />
    </Provider>,
  );
  expect(component.container).toHaveTextContent('No results found');
});

test('render InstitutionAdminsTable with data', () => {
  const data = Factory.build('adminList');
  const component = render(
    <Provider store={initializeStore()}>
      <InstitutionAdminsTable data={data} />
    </Provider>,
  );
  // This should have 3 table rows, inside the table component, 1 for the header and 2 for the details.
  const tableRows = component.container.querySelectorAll('tr');

  expect(component.container).toHaveTextContent('user1@example.com');
  expect(component.container).toHaveTextContent('user2@example.com');
  expect(component.container).not.toHaveTextContent('No results found');
  expect(tableRows).toHaveLength(3);
});
