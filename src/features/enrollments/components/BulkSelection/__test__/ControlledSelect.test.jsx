import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProvidersAndIntl } from 'test-utils';
import ControlledSelect from 'features/enrollments/components/BulkSelection/ControlledSelect';
import { SelectionContext } from 'features/enrollments/components/BulkSelection/SelectionContext';

describe('ControlledSelect', () => {
  const mockRow = {
    original: {
      id: '101',
      status: 'Active',
    },
  };

  const renderComponent = (selectedRowsMap = {}, onToggleRow = jest.fn()) => renderWithProvidersAndIntl(
    <SelectionContext.Provider value={{ selectedRowsMap, onToggleRow }}>
      <ControlledSelect row={mockRow} />
    </SelectionContext.Provider>,
  );

  test('renders checkbox control and calls onToggleRow on click', () => {
    const onToggleRowMock = jest.fn();
    renderComponent({}, onToggleRowMock);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(onToggleRowMock).toHaveBeenCalledTimes(1);
    expect(onToggleRowMock).toHaveBeenCalledWith(mockRow.original);
  });

  test('renders checked checkbox when row is in selectedRowsMap', () => {
    const selectedRowsMap = {
      '101-Active': mockRow.original,
    };

    renderComponent(selectedRowsMap);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
