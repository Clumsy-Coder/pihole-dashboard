import apiSlice, { TagTypes, HttpQueryType } from '@redux/apiSlice';
import { getAllQueriesUrl } from '@utils/url/api';
import { IGetAllQueries } from '@utils/url/upstream.types';
import { IGetRequestData } from '@pages/api/queries';

const allQueriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getAllQueries: build.query<IGetAllQueries, IGetRequestData>({
      query: ({ numEntries, from, until, client, domain, queryType, forwardDest, type }) => {
        let url = getAllQueriesUrl;

        url += numEntries ? `=${numEntries}` : '';
        url += from ? `&from=${from}` : '';
        url += until ? `&until=${until}` : '';
        url += client ? `&client=${client}` : '';
        url += domain ? `&domain=${domain}` : '';
        url += queryType ? `&querytype=${queryType}` : '';
        url += forwardDest ? `&forwarddest=${forwardDest}` : '';
        // url += type ? `&type=${forwardDest}` : ''

        return {
          url,
          method: HttpQueryType.GET,
        };
      },
      providesTags: () => [{ type: TagTypes.ALL_QUERIES }],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const { useGetAllQueriesQuery } = allQueriesApi;
