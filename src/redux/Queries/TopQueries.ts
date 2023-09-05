import apiSlice, { TagTypes, HttpQueryType } from '@redux/apiSlice';
import { getTopPermittedQueriesUrl, getTopBlockedQueriesUrl } from '@utils/url/api';
import { ITopPermittedQueries, ITopBlockedQueries } from '@utils/url/upstream.types';


const topQueriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getTopPermittedQueries: build.query<ITopPermittedQueries, number>({
      query: (numEntries = 10) => ({
        url: `${getTopPermittedQueriesUrl}?numEntries=${numEntries}`,
        method: HttpQueryType.GET,
      }),
      providesTags: () => [{ type: TagTypes.QUERY_TOP_PERMITTED }],
    }),
    getTopBlockedQueries: build.query<ITopBlockedQueries, number>({
      query: (numEntries = 10) => ({
        url: `${getTopBlockedQueriesUrl}?numEntries=${numEntries}`,
        method: HttpQueryType.GET,
      }),
      providesTags: () => [{ type: TagTypes.QUERY_TOP_BLOCKED }],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetTopPermittedQueriesQuery, useGetTopBlockedQueriesQuery } = topQueriesApi;
