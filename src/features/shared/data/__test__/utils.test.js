import { getDeleteOrderErrorMessage, getAvailableBulkActions } from 'features/shared/data/utils';
import {
  DELETE_ORDER_ERROR_MESSAGES,
  GENERIC_DELETE_ORDER_ERROR,
  EnrollmentStatus,
  BulkAction,
} from 'features/shared/data/constants';

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

describe('getAvailableBulkActions', () => {
  test('returns empty array when selectedRows is empty or undefined', () => {
    expect(getAvailableBulkActions([])).toEqual([]);
    expect(getAvailableBulkActions(null)).toEqual([]);
    expect(getAvailableBulkActions(undefined)).toEqual([]);
  });

  test('returns allowed actions for a single selected row', () => {
    const selectedRows = [{ status: EnrollmentStatus.ACTIVE }];
    expect(getAvailableBulkActions(selectedRows)).toEqual([
      BulkAction.DISABLE,
      BulkAction.EXTEND,
    ]);
  });

  test('returns intersection of common actions when multiple rows with same status are selected', () => {
    const selectedRows = [
      { status: EnrollmentStatus.ACTIVE },
      { status: EnrollmentStatus.ACTIVE },
    ];
    expect(getAvailableBulkActions(selectedRows)).toEqual([
      BulkAction.DISABLE,
      BulkAction.EXTEND,
    ]);
  });

  test('returns intersection action when ACTIVE and EXPIRED rows are mixed', () => {
    const selectedRows = [
      { status: EnrollmentStatus.ACTIVE }, // Actions: disable, extend
      { status: EnrollmentStatus.EXPIRED }, // Actions: extend
    ];
    expect(getAvailableBulkActions(selectedRows)).toEqual([BulkAction.EXTEND]);
  });

  test('returns empty array when mixed statuses have no overlapping actions', () => {
    const selectedRows = [
      { status: EnrollmentStatus.ACTIVE }, // Actions: disable, extend
      { status: EnrollmentStatus.INACTIVE }, // Actions: enable
    ];
    expect(getAvailableBulkActions(selectedRows)).toEqual([]);
  });
});
