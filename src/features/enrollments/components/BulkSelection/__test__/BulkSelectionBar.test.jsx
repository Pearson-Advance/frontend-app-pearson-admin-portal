import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProvidersAndIntl } from 'test-utils';
import BulkSelectionBar from 'features/enrollments/components/BulkSelection/BulkSelectionBar';

jest.mock('../BulkActionBar', () => ({
  BulkActionBar: () => <div data-testid="mock-bulk-action-bar">BulkActionBar</div>,
}));

describe('BulkSelectionBar', () => {
  const defaultProps = {
    selectedFlatRows: [{ id: '1' }],
    totalCount: 10,
    onApplyAction: jest.fn(),
    onSelectAll: jest.fn(),
    onClearSelection: jest.fn(),
    isSelectingAll: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns null when no rows are selected', () => {
    const { container } = renderWithProvidersAndIntl(
      <BulkSelectionBar {...defaultProps} selectedFlatRows={[]} />,
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders selected count and "Select all" button when partial rows are selected', () => {
    renderWithProvidersAndIntl(
      <BulkSelectionBar {...defaultProps} selectedFlatRows={[{ id: '1' }, { id: '2' }]} totalCount={10} />,
    );

    expect(screen.getByText('2 selected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /select all 10/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear selection/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-bulk-action-bar')).toBeInTheDocument();
  });

  test('hides "Select all" button when all items are selected', () => {
    renderWithProvidersAndIntl(
      <BulkSelectionBar
        {...defaultProps}
        selectedFlatRows={[{ id: '1' }, { id: '2' }]}
        totalCount={2}
      />,
    );

    expect(screen.getByText('2 selected')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /select all/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear selection/i })).toBeInTheDocument();
  });

  test('shows loading state on "Select all" button when isSelectingAll is true', () => {
    renderWithProvidersAndIntl(
      <BulkSelectionBar {...defaultProps} isSelectingAll />,
    );

    const selectAllBtn = screen.getByRole('button', { name: /selecting all…/i });
    expect(selectAllBtn).toBeInTheDocument();
    expect(selectAllBtn).toBeDisabled();
  });

  test('calls onSelectAll callback when "Select all" button is clicked', () => {
    renderWithProvidersAndIntl(<BulkSelectionBar {...defaultProps} />);

    const selectAllBtn = screen.getByRole('button', { name: /select all 10/i });
    fireEvent.click(selectAllBtn);

    expect(defaultProps.onSelectAll).toHaveBeenCalledTimes(1);
  });

  test('calls onClearSelection callback when "Clear selection" button is clicked', () => {
    renderWithProvidersAndIntl(<BulkSelectionBar {...defaultProps} />);

    const clearBtn = screen.getByRole('button', { name: /clear selection/i });
    fireEvent.click(clearBtn);

    expect(defaultProps.onClearSelection).toHaveBeenCalledTimes(1);
  });
});
