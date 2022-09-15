import apiSlice, { TagTypes, HttpQueryType } from '@redux/apiSlice';
import { getSummaryUrl, getSummaryRawUrl } from '@utils/url/api';
import { ISummary, ISummaryRaw } from '@utils/url/upstream.types';

const summaryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getSummary: build.query<ISummary, void>({
      query: () => ({
        url: getSummaryUrl,
        method: HttpQueryType.GET,
      }),
      providesTags: () => [{ type: TagTypes.SUMMARY }],
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getSummaryRaw: build.query<ISummaryRaw, void>({
      query: () => ({
        url: getSummaryRawUrl,
        method: HttpQueryType.GET,
      }),
      providesTags: () => [{ type: TagTypes.SUMMARY_RAW }],
    }),
  }),
});

export const { useGetSummaryQuery, useGetSummaryRawQuery } = summaryApi;
