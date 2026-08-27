import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProvidersAndIntl } from 'test-utils';
import ControlledSelect from 'features/enrollments/components/BulkSelection/ControlledSelect';

describe('ControlledSelect', () => {
  const createMockRow = (isSelected = false) => ({
    id: '101',
    isSelected,
    toggleRowSelected: jest.fn(),
    getToggleRowSelectedProps: jest.fn(() => ({
      checked: isSelected,
      indeterminate: false,
    })),
  });

  test('renders checkbox control and calls toggleRowSelected on click', () => {
    const mockRow = createMockRow(false);

    renderWithProvidersAndIntl(<ControlledSelect row={mockRow} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(mockRow.toggleRowSelected).toHaveBeenCalledTimes(1);
  });

  test('renders checked checkbox when row is selected', () => {
    const mockRow = createMockRow(true);

    renderWithProvidersAndIntl(<ControlledSelect row={mockRow} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
