import { camelCaseObject, getConfig } from '@edx/frontend-platform';
import { apiSlice } from 'features/shared/data/apiSlice';

/**
 * Institutions endpoint injected into the shared RTK Query API slice.
 */
export const institutionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutions: builder.query({
      query: (selectedInstitution = null) => ({
        url: `${getConfig().COURSE_OPERATIONS_API_BASE_URL}/institutions/`,
        params: {
          ordering: 'name',
          ...(selectedInstitution ? { id: selectedInstitution } : {}),
        },
      }),
      transformResponse: (response) => camelCaseObject(response),
      providesTags: ['Institutions'],
      // Institutions rarely change; keep the cached result longer to avoid refetching
      // when navigating between tabs.
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetInstitutionsQuery,
} = institutionsApiSlice;
