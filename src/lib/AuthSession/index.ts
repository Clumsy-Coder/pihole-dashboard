// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from 'iron-session';

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

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'iron-session/pihole/auth',
  // https://github.com/vvo/iron-session#ironoptions
  cookieOptions: {
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 60 - 60, // 30 minutes in seconds
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    authSession: IAuthSession;
  }
}
