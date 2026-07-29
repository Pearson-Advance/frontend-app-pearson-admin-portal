import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { DataReportPage } from 'features/dataReport/components/DataReportPage';
import { renderWithProvidersAndIntl } from 'test-utils';

describe('Test suite for DataReportPage component.', () => {
  beforeEach(() => {
    renderWithProvidersAndIntl(<DataReportPage />);
  });

  test('render Filters  component', () => {
    expect(screen.getAllByRole('combobox', { class: /select__input/i }))
      .toHaveLength(2); // institutions and master courses comboboxes.
  });

  test('render License usage CCX Level component', () => {
    expect(screen.getAllByRole('table')).toHaveLength(1);
    // "CCX ID" appears twice at the CCX level: as a filter field label and as a table column header.
    expect(screen.queryAllByText('CCX ID')).toHaveLength(2);
  });

  test('change tab to License usage MC Level', () => {
    const mcLevelButton = screen.getByRole('tab', { name: 'MC Level' });

    fireEvent.click(mcLevelButton);
    expect(screen.getAllByRole('table')).toHaveLength(1);
    expect(screen.queryAllByText('CCX ID')).toHaveLength(0); // This column does not exist in this table.
  });
});
