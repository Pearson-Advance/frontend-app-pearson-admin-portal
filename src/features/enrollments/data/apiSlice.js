import { camelCaseObject, snakeCaseObject, getConfig } from '@edx/frontend-platform';
import { apiSlice } from 'features/shared/data/apiSlice';
import { removeNullOrEmptyObjectAttributes } from 'features/shared/data/utils';
import { MAX_TABLE_RECORDS } from 'features/shared/data/constants';

/**
 * Enrollments endpoints injected into the shared RTK Query API slice.
 */
export const enrollmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudentEnrollments: builder.query({
      query: (filters = {}) => ({
        url: `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/licensed-enrollments/`,
        params: {
          page_size: MAX_TABLE_RECORDS,
          ...snakeCaseObject(removeNullOrEmptyObjectAttributes(filters || {})),
        },
      }),
      transformResponse: (response) => camelCaseObject(response),
      providesTags: ['Enrollments'],
    }),
  }),
});

export const {
  useGetStudentEnrollmentsQuery,
} = enrollmentsApiSlice;
