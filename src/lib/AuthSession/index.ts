// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';

/**
 * Iron session data format to be used
 */
export interface IAuthSession {
  /**
   * IP address of Pi-hole
   */
  ipAddress: string;
  /**
   * Port number of Pi-hole
   */
  port: string;
  /**
   * Password of Pi-hole authentication.
   * Stored as sha256sum
   */
  password: string;
}

/**
 * Time the cookie will be valid for in seconds.
 */
const ironSessionTTL = 30 * 60;

/**
 * Iron session configs
 */
export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'iron-session/pihole/auth',
  ttl: ironSessionTTL,
  // https://github.com/vvo/iron-session#ironoptions
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === 'production',
    // https://github.com/vvo/iron-session#session-cookies
    // maxAge: undefined // session expires when closing window/tab.
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    authSession: IAuthSession;
  }
}

/**
 * Wrapping function used for iron-session in NextJS api routes
 *
 * @example
 * ```typescript
 * // /api/auth/login
 *
 * import { withSessionRoute } from '@lib/AuthSession
 *
 * const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => { ... }
 *
 * withSessionRoute(requestHandler)
 * ```
 */
export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

/**
 * Wrapping function used for getServerSideProps function on client side
 *
 * @example
 * ```typescript
 * // pages/login/index.tsx
 *
 * import { GetServerSidePropsContext } from 'next';
 * import { withSessionSsr } from '@lib/AuthSession'
 *
 * const component = () => (<div>component</div>)
 *
 * const serverPropsHandler = ({request}: GetServerSidePropsContext => {
 *    const authSession = request.session.authSession
 *
 *    // if already logged in, go to home page
 *    if(authSession) {
 *      return {
 *         redirect: {
 *           destination: '/',
 *           permanent: true,
 *         },
 *       };
 *    }
 * })
 *
 * const getServerSideProps = withSessionSsr(serverPropsHandler)
 *
 * ```
 *
 * @param handler - getServerSideProps handler
 * @returns iron-session wrapped in getServerSideProps function
 */
// Thesis types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<P extends Record<string, unknown> = Record<string, unknown>>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}
