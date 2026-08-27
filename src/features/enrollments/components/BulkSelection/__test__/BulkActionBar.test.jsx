import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProvidersAndIntl } from 'test-utils';
import { BulkActionBar } from 'features/enrollments/components/BulkSelection/BulkActionBar';

jest.mock('features/shared/data/utils', () => ({
  getAvailableBulkActions: jest.fn((selectedRows) => {
    if (selectedRows.length === 0) { return []; }
    if (selectedRows.some((r) => r.status === 'mixed')) { return []; }
    return ['revoke', 'extend'];
  }),
}));

describe('BulkActionBar', () => {
  const mockOnApplyAction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders disabled actions button when no rows are selected', () => {
    renderWithProvidersAndIntl(
      <BulkActionBar selectedFlatRows={[]} onApplyAction={mockOnApplyAction} />,
    );

    const button = screen.getByRole('button', { name: /actions/i });
    expect(button).toBeDisabled();
  });

  test('renders enabled actions button when rows have common actions', () => {
    const selectedRows = [{ original: { id: 1, status: 'Pending' } }];

    renderWithProvidersAndIntl(
      <BulkActionBar selectedFlatRows={selectedRows} onApplyAction={mockOnApplyAction} />,
    );

    const button = screen.getByRole('button', { name: /actions/i });
    expect(button).not.toBeDisabled();
  });

  test('calls onApplyAction when a dropdown option is selected', () => {
    const selectedRows = [{ original: { id: 1, status: 'Pending' } }];

    renderWithProvidersAndIntl(
      <BulkActionBar selectedFlatRows={selectedRows} onApplyAction={mockOnApplyAction} />,
    );

    const button = screen.getByRole('button', { name: /actions/i });
    fireEvent.click(button);

    const revokeOption = screen.getByText('Revoke');
    fireEvent.click(revokeOption);

    expect(mockOnApplyAction).toHaveBeenCalledTimes(1);
    expect(mockOnApplyAction).toHaveBeenCalledWith('revoke', selectedRows);
  });

  test('shows tooltip overlay when selected rows have no common actions', async () => {
    const selectedRows = [{ original: { id: 1, status: 'mixed' } }];

    renderWithProvidersAndIntl(
      <BulkActionBar selectedFlatRows={selectedRows} onApplyAction={mockOnApplyAction} />,
    );

    const buttonContainer = screen.getByRole('button', { name: /actions/i }).parentElement;
    fireEvent.mouseOver(buttonContainer);

    expect(
      await screen.findByText(/There are no applicable actions for the selected combination of items/i),
    ).toBeInTheDocument();
  });
});
