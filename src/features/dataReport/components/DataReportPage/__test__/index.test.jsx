import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { DataReportPage } from 'features/dataReport/components/DataReportPage';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

let store;

describe('Test suite for DataReportPage component.', () => {
  beforeEach(() => {
    store = initializeStore();

    render(
      <Provider store={store}>
        <DataReportPage />
      </Provider>,
    );
  });

  test('render Filters  component', () => {
    expect(screen.getAllByRole('combobox', { class: /select__input/i }))
      .toHaveLength(2); // institutions and master courses comboboxes.
  });

  test('render License usage CCX Level component', () => {
    expect(screen.getAllByRole('table')).toHaveLength(1);
    expect(screen.queryAllByText('CCX ID')).toHaveLength(1);
  });

  test('change tab to License usage MC Level', () => {
    const mcLevelButton = screen.getByRole('tab', { name: 'MC Level' });

    fireEvent.click(mcLevelButton);
    expect(screen.getAllByRole('table')).toHaveLength(1);
    expect(screen.queryAllByText('CCX ID')).toHaveLength(0); // This column does not exist in this table.
  });
});
