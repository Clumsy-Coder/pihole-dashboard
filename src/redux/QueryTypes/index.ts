import apiSlice, { TagTypes, HttpQueryType } from '@redux/apiSlice';
import { getQueryTypesUrl } from '@utils/url/api';
import { IQueryTypes } from '@utils/url/upstream.types';

const queryTypesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getQueryTypes: build.query<IQueryTypes, void>({
      query: () => ({
        url: getQueryTypesUrl,
        method: HttpQueryType.GET,
      }),
      providesTags: () => [{ type: TagTypes.QUERY_TYPES }],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetQueryTypesQuery } = queryTypesApi;
