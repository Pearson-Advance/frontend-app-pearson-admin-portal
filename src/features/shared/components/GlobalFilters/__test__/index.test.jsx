import React from 'react';
import { render } from '@testing-library/react';
import { Factory } from 'rosie';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import { GlobalFilters } from 'features/shared/components/GlobalFilters';

import 'features/institutions/data/__factories__';

test('render Institution global filter', () => {
  const data = Factory.build('institutionsList');
  const component = render(
    <Provider store={initializeStore({
      page: {
        globalFilters: {
          institutions: data,
          selectedInstitution: null,
        },
      },
    })}
    >
      <GlobalFilters />
    </Provider>,
  );

  expect(component.container).toHaveTextContent('Search by Institution:');
  expect(component.container).toHaveTextContent('Select...');
});
