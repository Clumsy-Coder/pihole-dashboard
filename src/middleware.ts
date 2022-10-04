import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';

import { sessionOptions } from '@lib/AuthSession/Config';

/**
 * NextJS middleware used for redirecting
 * - Non authenticated API calls to `/api/auth/unauthorized`
 * - Non authenticated page load to `/login` page
 */
export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const { authSession } = await getIronSession(req, res, sessionOptions);
  const url = req.nextUrl.pathname;

  // if accessing API url
  if (url.startsWith('/api')) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (authSession === undefined) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    }
  }
  // if accessing pages URL
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  else if (authSession === undefined) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return res;
};

export const config = {
  matcher: [
    // api routes
    '/api/summary',
    '/api/forwardedDestinations',
    '/api/queryTypes',
    '/api/queries/topPermitted',
    '/api/queries/topBlocked',
    '/api/queries/clients/topAllowed',
    '/api/queries/clients/topBlocked',

    // page routes
    '/',
  ],
};
