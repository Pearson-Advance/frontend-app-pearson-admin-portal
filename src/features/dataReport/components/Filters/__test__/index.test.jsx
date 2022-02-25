import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { Filters } from 'features/dataReport/components/Filters';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

const setFilters = jest.fn();
const handleCleanFilters = jest.fn();

describe('Test suite for Filters component.', () => {
  beforeEach(() => {
    const store = initializeStore();

    render(
      <Provider store={store}>
        <Filters
          filters={{}}
          setFilters={setFilters}
          institutions={[]}
          eligibleCourses={[]}
          handleCleanFilters={handleCleanFilters}
        />
      </Provider>,
    );
  });

  test('render Filters  component', () => {
    expect(screen.getAllByRole('combobox', { class: /select__input/i }))
      .toHaveLength(2); // institutions and master courses comboboxes.
  });
});
