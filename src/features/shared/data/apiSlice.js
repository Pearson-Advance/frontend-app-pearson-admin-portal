import { createApi } from '@reduxjs/toolkit/query/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { logError } from '@edx/frontend-platform/logging';

/**
 * Custom RTK Query baseQuery built on top of the authenticated axios client
 * from @edx/frontend-platform.
 *
 * It forwards the AbortSignal that RTK Query provides for every request, so any
 * in-flight request is cancelled automatically when the last component
 * subscribed to the query unmounts, or when the query arguments change (which
 * prevents stale responses from overwriting the latest selection).
 *
 * @returns {Function} A baseQuery compatible with RTK Query's createApi.
 */
const axiosBaseQuery = () => async ({
  url,
  method = 'get',
  params,
  data,
  responseType,
}, { signal }) => {
  try {
    const result = await getAuthenticatedHttpClient().request({
      url,
      method,
      params,
      data,
      responseType,
      signal,
    });

    return { data: result.data };
  } catch (axiosError) {
    if (signal?.aborted) {
      return { error: { status: 'ABORTED', data: 'Request aborted' } };
    }

    logError(axiosError);

    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Enrollments', 'Institutions'],
  endpoints: () => ({}),
});
