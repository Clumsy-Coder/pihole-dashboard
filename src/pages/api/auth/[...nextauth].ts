/* eslint-disable @typescript-eslint/no-unused-vars */
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { Awaitable, NextAuthOptions } from 'next-auth';
import axios, { AxiosError, AxiosResponse } from 'axios';
import crypto from 'crypto';

import { IUser, ISession } from '@lib/types/next-auth';
import { ErrorResponse } from '@lib/AxiosError';
import logger from '@utils/logger';

export const providerName = 'Credentials';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: providerName,
      credentials: {
        ipAddress: {
          label: 'IP address',
          type: 'text',
          placeholder: 'IPv4 address',
          // required: true,
        },
        port: {
          label: 'Port',
          type: 'number',
          placeholder: 'Port number of Pi-Hole admin portal',
          defaultValue: 80,
          // required: true,
        },
        password: {
          label: 'Password',
          type: 'password',
          // required: true,
        },
      },
      async authorize(credentials, _req) {
        // const authLogger = logger.scope('next-auth/credentials-provider/', 'authorize');
        const { ipAddress = '', port = '', password = '' } = credentials as IUser;

        // authLogger.debug('credentials: ', credentials);
        console.debug('credentials: ', credentials);

        const localPort = process.env.PORT || 3000;
        const loginUrl = `http://localhost:${localPort}/api/auth/login`;

        interface Response {
          message: string;
        }

        // needed because axios interceptors used in api /auth/login are set as global
        axios.interceptors.response.clear();

        // authLogger.info('authenticating user on api endpoint /api/auth/login');
        // console.info('authenticating user on api endpoint /api/auth/login');
        const response: AxiosResponse<Response> = await axios
          .post<Response>(loginUrl, {
            ipAddress,
            port,
            password,
            // timeout: 1000,
          })
          .catch((error: AxiosError<ErrorResponse>) => {
            // console.log(error);
            // console.log('next-auth error: ', error.response?.data.message);
            // authLogger.error('error: ', error.response?.data.message);
            // console.error('error: ', error.response?.data.message);
            throw new Error(error.response?.data.message);
          });

        const hash: string = crypto.createHash('sha256').update(password).digest('hex');
        // console.log('next-auth response: ', response);
        // authLogger.debug('response: ', response.data.message);
        // authLogger.complete('user authenticated');
        // console.debug('response: ', response.data.message);
        // console.log('user authenticated');
        return {
          id: 1,
          ipAddress,
          port,
          password: hash,
        };

        // return null;
      },
    }),
  ],
  callbacks: {
    // jwt({ token, user, session }) {
    jwt(props) {
      // const jwtLogger = logger.scope('next-auth/credentials-provider/', 'callback', 'jwt');

      // jwt(props) {
      // const { token, user } = props;
      // eslint-disable-next-line prefer-destructuring
      const token = props.token;
      // eslint-disable-next-line prefer-destructuring
      const user: IUser = props.user as unknown as IUser;

      // jwtLogger.debug('token: ', token);
      // jwtLogger.debug('user: ', user);
      // jwtLogger.debug('session: ', session);

      // token.userRole = "admin";

      // token.user = user;
      // return token;

      if (user) {
        return {
          ...token,
          // id: user.id,
          ipAddress: user.ipAddress,
          port: user.port,
          password: user.password,
        };
      }

      return token;
    },
    // async signIn({ user, credentials }) {
    //   // console.log("next-auth callback signIn user", user);
    //   // console.log("next-auth callback signIn credentials", credentials);
    //
    //   return true;
    // },
    session(props): Awaitable<ISession> {
      // session(props) {
      // const sessionLogger = logger.scope('next-auth/credentials-provider/', 'callback', 'jwt');

      // const { session, token, user } = props;
      // eslint-disable-next-line prefer-destructuring
      const session = props.session;
      // eslint-disable-next-line prefer-destructuring
      const token = props.token;
      // eslint-disable-next-line prefer-destructuring
      const user = props.user;

      // console.log('callback session: session', session);
      // console.log('callback session: token', token);
      // console.log('callback session: user', user);
      // console.log('-------------------------------------------------');
      // sessionLogger.debug('session: ', session);
      // sessionLogger.debug('token: ', token);
      // sessionLogger.debug('user: ', user);

      // session.user = token.user;

      return {
        ...session,
        user: {
          // ...session.user,
          // id: token.id,
          ipAddress: token.ipAddress,
          port: token.port,
          // password: token.password
        },
      };
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  theme: {
    colorScheme: 'dark',
    // logo: '/pihole-logo.svg',
  },
  debug: process.env.NODE_ENV !== 'production',
};

export default NextAuth(authOptions);
