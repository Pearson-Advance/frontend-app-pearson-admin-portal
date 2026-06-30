import { renderHook, act } from '@testing-library/react';
import { useDebounce } from 'features/shared/hooks/useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 400));
    expect(result.current).toBe('initial');
  });

  test('updates the debounced value only after the delay elapses', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'ab' });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(399);
    });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('ab');
  });

  test('resets the timer on rapid changes (only the last value wins)', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'ab' });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    rerender({ value: 'abc' });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('abc');
  });
});
