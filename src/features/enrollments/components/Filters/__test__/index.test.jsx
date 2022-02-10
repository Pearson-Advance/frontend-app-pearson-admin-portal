import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { Filters } from 'features/enrollments/components/Filters';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import userEvent from '@testing-library/user-event';

const setFilters = jest.fn();
const handleCleanFilters = jest.fn();
const handleApplyFilters = jest.fn();

describe('Test suite for Filters component.', () => {
  beforeEach(() => {
    const store = initializeStore();

    render(
      <Provider store={store}>
        <Filters
          filters={{}}
          setFilters={setFilters}
          institutions={[]}
          managedCourses={[]}
          handleCleanFilters={handleCleanFilters}
          handleApplyFilters={handleApplyFilters}
        />
      </Provider>,
    );
  });

  test('render Filters  component', () => {
    const learnerEmailElement = screen.getByTestId('learnerEmail');
    expect(screen.getAllByRole('combobox', { class: /select__input/i }))
      .toHaveLength(3); // institutions, mastercourses and enrollments comboboxes.

    userEvent.type(learnerEmailElement, 'example@example.com');

    expect(learnerEmailElement).toHaveValue('example@example.com');
  });
});
