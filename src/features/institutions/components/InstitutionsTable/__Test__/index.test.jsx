import { render } from '@testing-library/react';
import { Factory } from 'rosie';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import { InstitutionsTable } from 'features/institutions/components/InstitutionsTable';

import '@testing-library/jest-dom/extend-expect';
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
  expect(component.container).toHaveTextContent('uuid-12345 1');
  expect(component.container).toHaveTextContent('uuid-12345 2');
  expect(component.container).not.toHaveTextContent('No results found');
  expect(tableRows).toHaveLength(3);
});

test('Render InstitutionsTable with expected columns.', () => {
  const data = Factory.build('institutionsList');
  const component = render(
    <Provider store={initializeStore()}>
      <InstitutionsTable data={data} />
    </Provider>,
  );
  const tableHeadRowsProxy = component.container.querySelectorAll('table thead tr');
  const tableHeadRowsElement = tableHeadRowsProxy[0];

  expect(tableHeadRowsElement).toHaveTextContent('ID');
  expect(tableHeadRowsElement).toHaveTextContent('Name');
  expect(tableHeadRowsElement).toHaveTextContent('Short name');
  expect(tableHeadRowsElement).toHaveTextContent('External ID');
  expect(tableHeadRowsElement).toHaveTextContent('Active');
  expect(tableHeadRowsElement).toHaveTextContent('Actions');
  expect(tableHeadRowsElement.children).toHaveLength(6);
});
