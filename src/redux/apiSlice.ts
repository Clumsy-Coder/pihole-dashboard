import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum TagTypes {
  AUTH = 'AUTH',
  SUMMARY = 'SUMMARY',
  SUMMARY_RAW = 'SUMMARY_RAW',
  FORWARDED_DESTINATIONS = 'FORWARDED_DESTINATIONS',
  QUERY_TYPES = 'QUERY_TYPES',
  QUERY_TOP_PERMITTED = 'QUERY_TOP_PERMITTED',
  QUERY_TOP_BLOCKED = 'QUERY_TOP_BLOCKED',
  QUERY_CLIENTS_TOP_ALLOWED = 'QUERY_CLIENTS_TOP_ALLOWED',
  QUERY_CLIENTS_TOP_BLOCKED = 'QUERY_CLIENTS_TOP_BLOCKED',
  QUERY_OVERTIME_RAW = 'QUERY_OVERTIME_RAW',
}

/**
 * HTTP query types.
 * Used by Redux Toolkit Query API
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods}
 */
export enum HttpQueryType {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
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
