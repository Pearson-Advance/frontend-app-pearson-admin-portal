import { format } from 'date-fns/format';
/**
 * Format a UTC date
 *
 * @param {string} date - UTC date
 * @param {string} formatStr - pattern to be formatted
 * @returns {string} Formatted date
 */
export const formatUTCDate = (date, formatStr = 'MM/dd/yy') => {
  if (!date) {
    return null;
  }

  const [year, month, day] = date.slice(0, 10).split('-');
  return format(new Date(
    year,
    (month - 1),
    day,
  ), formatStr);
};
