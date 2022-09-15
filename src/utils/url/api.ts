/**
 * URL for fetching session
 */
export const getAuthSessionUrl = `auth/session`;

/**
 * URL for logging in to Pi-hole
 */
export const postAuthSessionUrl = `auth/login`;

/**
 * URL for logging out of Pi-hole
 */
export const deleteAuthSessionUrl = `auth/logout`;

/**
 * URL for getting message user is not Authenticated.
 * To be used by protected API endpoints
 */
export const getUnauthorizedUrl = 'auth/unauthorized';

//-------------------------------------------------------------------------------------------------

/**
 * URL for fetching Pi-hole summary with formatted data
 */
export const getSummaryUrl = 'summary';

/**
 * URL for fetching Pi-hole summary with raw data
 */
export const getSummaryRawUrl = 'summary?raw=true';
