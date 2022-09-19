import apiSlice, { TagTypes, HttpQueryType } from '@redux/apiSlice';
import { getForwardedDestinationsUrl } from '@utils/url/api';
import { IForwardedDestinations } from '@utils/url/upstream.types';

const summaryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getForwardedDestinations: build.query<IForwardedDestinations, void>({
      query: () => ({
        url: getForwardedDestinationsUrl,
        method: HttpQueryType.GET,
      }),
      providesTags: () => [{ type: TagTypes.FORWARDED_DESTINATIONS }],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetForwardedDestinationsQuery } = summaryApi;
