import apiSlice, { TagTypes, HttpQueryType } from '@redux/apiSlice';
import { getTopAllowedClientsUrl } from '@utils/url/api';
import { ITopClientsData } from '@utils/url/upstream.types';

const clientsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getTopAllowedClients: build.query<ITopClientsData, number>({
      query: (numEntries = 10) => ({
        url: `${getTopAllowedClientsUrl}?numEntries=${numEntries}`,
        method: HttpQueryType.GET,
      }),
      providesTags: () => [{ type: TagTypes.QUERY_CLIENTS_TOP_ALLOWED }],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetTopAllowedClientsQuery } = clientsApi;
