import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum TagTypes {
  AUTH = 'AUTH',
}

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: [TagTypes.AUTH],
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
});

export default apiSlice;
