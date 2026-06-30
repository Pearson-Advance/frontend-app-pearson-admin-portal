import { useEffect, useState } from 'react';

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms
 * have elapsed without `value` changing. Useful to throttle API requests
 * triggered by fast-changing inputs (e.g. text filters).
 *
 * @param {*} value - The value to debounce.
 * @param {number} [delay=400] - Debounce delay in milliseconds.
 * @returns {*} The debounced value.
 */
export const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
