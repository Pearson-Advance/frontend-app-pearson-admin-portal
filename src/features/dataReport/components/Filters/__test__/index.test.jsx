import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
import { Filters } from 'features/dataReport/components/Filters';
import { DataReportTab } from 'features/shared/data/constants';
import { Provider } from 'react-redux';
import { initializeStore } from 'store';

const renderFilters = (props = {}) => {
  const store = initializeStore();

  return render(
    <Provider store={store}>
      <Filters
        filters={{ ccxName: '', ccxId: '' }}
        setFilters={jest.fn()}
        institutions={[]}
        eligibleCourses={[]}
        handleCleanFilters={jest.fn()}
        {...props}
      />
    </Provider>,
  );
};

describe('Test suite for Filters component.', () => {
  test('render Filters  component', () => {
    renderFilters();
    expect(screen.getAllByRole('combobox', { class: /select__input/i }))
      .toHaveLength(2); // institutions and master courses comboboxes.
  });

  test('renders Class Name and Class ID inputs at CCX level', () => {
    renderFilters({ dataReportTab: DataReportTab.CCX_LEVEL });
    expect(screen.getByTestId('ccxName')).toBeInTheDocument();
    expect(screen.getByTestId('ccxId')).toBeInTheDocument();
  });

  test('does not render Class Name and Class ID inputs at MC level', () => {
    renderFilters({ dataReportTab: DataReportTab.MC_LEVEL });
    expect(screen.queryByTestId('ccxName')).not.toBeInTheDocument();
    expect(screen.queryByTestId('ccxId')).not.toBeInTheDocument();
  });

  test('debounces the Class Name input before updating filters', () => {
    jest.useFakeTimers();
    const setFilters = jest.fn();

    renderFilters({ setFilters, dataReportTab: DataReportTab.CCX_LEVEL });
    setFilters.mockClear();

    fireEvent.change(screen.getByTestId('ccxName'), { target: { value: 'Algebra' } });
    expect(setFilters).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(setFilters).toHaveBeenCalled();
    const updater = setFilters.mock.calls[setFilters.mock.calls.length - 1][0];
    expect(updater({ ccxName: '', ccxId: '' })).toEqual({ ccxName: 'Algebra', ccxId: '' });

    jest.useRealTimers();
  });
});
