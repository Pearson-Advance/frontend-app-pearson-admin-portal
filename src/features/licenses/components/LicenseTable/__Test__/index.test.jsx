import React from 'react';
import { render } from '@testing-library/react';
import { Factory } from 'rosie';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import { LicenseTable } from 'features/licenses/components/LicenseTable';
import '@testing-library/jest-dom/extend-expect';
import 'features/licenses/data/__factories__';
import { RequestStatus } from 'features/shared/data/constants';

describe('Unit tests for Licenses data table.', () => {
  test('render LicensesTable with no data', () => {
    const component = render(
      <Provider store={initializeStore()}>
        <LicenseTable />
      </Provider>,
    );
    expect(component.container).toHaveTextContent('No results found');
  });

  test('render LicensesTable with data', () => {
    const data = Factory.build('licenseList');
    const component = render(
      <Provider store={initializeStore({
        licenses: {
          status: RequestStatus.IN_PROGRESS,
          data,
          pageSize: 10,
          pageIndex: 0,
        },
      })}
      >
        <LicenseTable data={data} />
      </Provider>,
    );

    // This should have 3 table rows, inside the table component, 1 for the header and 2 for the details.
    const tableRows = component.container.querySelectorAll('tr');

    expect(component.container).toHaveTextContent('course-v1:PX+01+2021');
    expect(component.container).toHaveTextContent('course-v1:PX+02+2021');
    expect(component.container).not.toHaveTextContent('No results found');
    expect(tableRows).toHaveLength(3);
  });
});
