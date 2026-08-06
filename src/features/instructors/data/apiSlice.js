import { camelCaseObject, snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { apiSlice } from 'features/shared/data/apiSlice';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';
import { MAX_TABLE_RECORDS } from 'features/shared/data/constants';

/**
 * Instructors endpoints injected into the shared RTK Query API slice.
 */
export const instructorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstructors: builder.query({
      query: (filters = {}) => ({
        url: `${getConfig().COURSE_OPERATIONS_API_V2_BASE_URL}/instructors/`,
        params: {
          page_size: MAX_TABLE_RECORDS,
          ...snakeCaseObject(removeNullOrEmptyObjectAttributes(filters || {})),
        },
      }),
      transformResponse: (response) => camelCaseObject(response),
      providesTags: ['Instructors'],
    }),
  }),
});

export const {
  useGetInstructorsQuery,
} = instructorsApiSlice;
