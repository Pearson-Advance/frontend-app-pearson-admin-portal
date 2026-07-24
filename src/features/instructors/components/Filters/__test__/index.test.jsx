import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';
import { Filters } from 'features/instructors/components/Filters';

const defaultFilters = {
  institutionId: null,
  courseName: null,
  instructorEmail: '',
  active: '',
};

const renderFilters = (props = {}) => {
  const store = initializeStore();

  return render(
    <Provider store={store}>
      <Filters
        filters={defaultFilters}
        setFilters={jest.fn()}
        handleCleanFilters={jest.fn()}
        handleApplyFilters={jest.fn()}
        setIsFilterApplied={jest.fn()}
        {...props}
      />
    </Provider>,
  );
};

describe('Test suite for Instructors Filters component', () => {
  test('renders Filters component correctly with all comboboxes and inputs', () => {
    renderFilters();

    const selectInputs = screen.getAllByRole('combobox').filter(input => input.classList.contains('select__input'));
    expect(selectInputs).toHaveLength(2);
    expect(screen.getByLabelText(/instructor email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  test('updates local state on input changes without calling handleApplyFilters directly', () => {
    const handleApplyFilters = jest.fn();
    const setIsFilterApplied = jest.fn();

    renderFilters({ handleApplyFilters, setIsFilterApplied });

    const emailInput = screen.getByLabelText(/instructor email/i);
    fireEvent.change(emailInput, { target: { name: 'instructorEmail', value: 'instructor@test.com' } });

    expect(emailInput.value).toBe('instructor@test.com');
    expect(setIsFilterApplied).toHaveBeenCalledWith(false);
    expect(handleApplyFilters).not.toHaveBeenCalled();
  });

  test('calls setFilters and handleApplyFilters with local filters when clicking Search icon', () => {
    const setFilters = jest.fn();
    const handleApplyFilters = jest.fn();

    renderFilters({ setFilters, handleApplyFilters });

    const emailInput = screen.getByLabelText(/instructor email/i);
    fireEvent.change(emailInput, { target: { name: 'instructorEmail', value: 'instructor@test.com' } });

    const applyButton = screen.getByRole('button', { name: /apply filters/i });
    fireEvent.click(applyButton);

    const expectedFilters = {
      ...defaultFilters,
      instructorEmail: 'instructor@test.com',
    };

    expect(setFilters).toHaveBeenCalledWith(expectedFilters);
    expect(handleApplyFilters).toHaveBeenCalledWith(expectedFilters);
  });

  test('resets local state and calls handleCleanFilters when clicking Clear icon', () => {
    const handleCleanFilters = jest.fn();

    renderFilters({
      filters: {
        institutionId: '1',
        courseName: 'Demo Course',
        instructorEmail: 'instructor@test.com',
        active: 'true',
      },
      handleCleanFilters,
    });

    const clearButton = screen.getByRole('button', { name: /clean filters|clear filters/i });
    fireEvent.click(clearButton);

    expect(handleCleanFilters).toHaveBeenCalled();
  });
});
