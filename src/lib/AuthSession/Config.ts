import type { IronSessionOptions } from 'iron-session';
import type { IronSessionOptions as IronSessionOptionsEdge } from 'iron-session/edge';

/**
 * Time the cookie will be valid for in seconds.
 */
export const ironSessionTTL = 30 * 60;

/**
 * Iron session configs
 */
export const sessionOptions: IronSessionOptions | IronSessionOptionsEdge = {
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
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
