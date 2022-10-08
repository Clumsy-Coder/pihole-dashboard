import apiSlice, { TagTypes, HttpQueryType } from '@redux/apiSlice';
import { getQueriesOvertimeUrl } from '@utils/url/api';
import { IOverTimeData10minutes } from '@utils/url/upstream.types';

const clientsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getQueriesOvertimeRaw: build.query<IOverTimeData10minutes, void>({
      query: () => ({
        url: `${getQueriesOvertimeUrl}`,
        method: HttpQueryType.GET,
      }),
      providesTags: () => [{ type: TagTypes.QUERY_OVERTIME_RAW }],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetQueriesOvertimeRawQuery } = clientsApi;
