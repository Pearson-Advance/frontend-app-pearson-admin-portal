import { getDeleteOrderErrorMessage } from 'features/shared/data/utils';
import { DELETE_ORDER_ERROR_MESSAGES, GENERIC_DELETE_ORDER_ERROR } from 'features/shared/data/constants';

describe('getDeleteOrderErrorMessage', () => {
  test('returns the session expired message for a 401 status', () => {
    expect(getDeleteOrderErrorMessage(401)).toEqual(DELETE_ORDER_ERROR_MESSAGES[401]);
  });

  test('returns the permission message for a 403 status', () => {
    expect(getDeleteOrderErrorMessage(403)).toEqual(DELETE_ORDER_ERROR_MESSAGES[403]);
  });

  test('returns the generic message for an unmapped status', () => {
    expect(getDeleteOrderErrorMessage(500)).toEqual(GENERIC_DELETE_ORDER_ERROR);
  });

  test('returns the generic message when the status is undefined', () => {
    expect(getDeleteOrderErrorMessage(undefined)).toEqual(GENERIC_DELETE_ORDER_ERROR);
  });
});
