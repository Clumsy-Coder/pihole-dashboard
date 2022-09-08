/* eslint-disable no-param-reassign */
import { IAuthSession } from '@lib/AuthSession';
import apiSlice, { TagTypes } from '@redux/apiSlice';
import { getAuthSessionUrl, postAuthSessionUrl, deleteAuthSessionUrl } from '@utils/url/api';

/**
 * Data structure of 'session' reducer
 */
export interface SessionState extends Omit<IAuthSession, 'password'> {
  /**
   * Message returned by the API.
   * Mainly used for displaying error messages from the API
   */
  message: string;
}

const authSessionApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getAuthSession: build.query<IAuthSession, void>({
      query: () => ({
        url: getAuthSessionUrl,
        method: 'GET',
      }),
      transformResponse: (response: IAuthSession) => {
        return { ...response, password: '' };
      },
      // providesTags: (result, error, id) => [{ type: TagTypes.AUTH }],
      providesTags: () => [{ type: TagTypes.AUTH }],
    }),
    postAuthSession: build.mutation<Pick<SessionState, 'message'>, IAuthSession>({
      query: ({ ipAddress, port, password }) => ({
        url: postAuthSessionUrl,
        method: 'POST',
        body: { ipAddress, port, password },
      }),
      invalidatesTags: [{ type: TagTypes.AUTH }],
      transformResponse: (response: { message: string }) => {
        return { message: response.message };
      },
      // extraOptions: { maxRetries: 5 },
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    deleteAuthSession: build.mutation<Pick<SessionState, 'message'>, void>({
      query: () => ({
        url: deleteAuthSessionUrl,
        method: 'DELETE',
      }),
      invalidatesTags: [TagTypes.AUTH],
    }),
  }),
});

export const { useGetAuthSessionQuery, usePostAuthSessionMutation, useDeleteAuthSessionMutation } =
  authSessionApi;
