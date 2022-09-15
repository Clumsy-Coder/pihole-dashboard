import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum TagTypes {
  AUTH = 'AUTH',
  SUMMARY = 'SUMMARY',
  SUMMARY_RAW = 'SUMMARY_RAW',
}

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: Object.values(TagTypes),
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
});

export default apiSlice;
