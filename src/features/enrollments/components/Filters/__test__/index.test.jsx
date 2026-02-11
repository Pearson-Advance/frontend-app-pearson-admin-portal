import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { Filters } from 'features/enrollments/components/Filters';
import { initializeStore } from 'store';

const setFilters = jest.fn();
const setIsFilterApplied = jest.fn();
const handleCleanFilters = jest.fn();
const handleApplyFilters = jest.fn();
const handleExportEnrollments = jest.fn();

describe('Test suite for Filters component.', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const store = initializeStore();

    render(
      <Provider store={store}>
        <Filters
          filters={{}}
          setFilters={setFilters}
          institutions={[]}
          eligibleCourses={[]}
          handleCleanFilters={handleCleanFilters}
          handleApplyFilters={handleApplyFilters}
          handleExportEnrollments={handleExportEnrollments}
          isFilterApplied
          setIsFilterApplied={setIsFilterApplied}
        />
      </Provider>,
    );
  });

  test('render Filters component', async () => {
    const user = userEvent.setup();
    const learnerEmailElement = screen.getByTestId('learnerEmail');

    expect(screen.getAllByRole('combobox')).toHaveLength(3);
    await user.type(learnerEmailElement, 'example@example.com');
    expect(learnerEmailElement).toHaveValue('example@example.com');
  });
});
