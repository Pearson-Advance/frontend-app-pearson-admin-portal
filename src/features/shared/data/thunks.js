import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform';
import {
  getInstitutions,
} from 'features/institutions/data/api';
import {
  fetchInstitutionsSelect,
} from './slices';

/**
 * Fetch all institutions to populate the institutions global filter options.
 * @returns {(function(*): Promise<void>)|*}
 */
export function fetchInstitutionsForGlobalFilter() {
  return async (dispatch) => {
    try {
      dispatch(
        fetchInstitutionsSelect(
          camelCaseObject((await getInstitutions()).data),
        ),
      );
    } catch (error) {
      logError(error);
    }
  };
}
