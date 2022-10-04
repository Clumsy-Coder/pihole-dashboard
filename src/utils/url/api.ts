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

//-------------------------------------------------------------------------------------------------

/**
 * URL for fetching Pi-hole number of queries that have been forwarded and the target
 * @remarks Authorization required
 * @remarks full URL `/api/forwardedDestinations`
 */
export const getForwardedDestinationsUrl = 'queries/forwardedDestinations';

//-------------------------------------------------------------------------------------------------

/**
 * URL for fetching Pi-hole Query types
 * @remarks Authorization required
 * @remarks full URL `/api/queryTypes`
 */
export const getQueryTypesUrl = 'queries/queryTypes';

//-------------------------------------------------------------------------------------------------

/**
 * URL for fetching Pi-hole `Top Permitted queries`
 *
 * @remarks Authorization required
 * @remarks full URL `/api/queries/topPermitted`
 */
export const getTopPermittedQueriesUrl = 'queries/domains/topAllowed';

/**
 * URL for fetching Pi-hole `Top Blocked queries`
 *
 * @remarks Authorization required
 * @remarks full URL `/api/queries/topBlocked`
 */
export const getTopBlockedQueriesUrl = 'queries/domains/topBlocked';

//-------------------------------------------------------------------------------------------------

/**
 * URL for fetching Pi-hole `Top Clients queries`
 *
 * @remarks Authorization required
 * @remarks full URL `/api/queries/clients/topAllowed`
 */
export const getTopAllowedClientsUrl = 'queries/clients/topAllowed';

/**
 * URL for fetching Pi-hole `Top Client Blocked queries`
 *
 * @remarks Authorization required
 * @remarks full URL `/api/queries/clients/topBlocked`
 */
export const getTopBlockedClientsUrl = 'queries/clients/topBlocked';

//-------------------------------------------------------------------------------------------------

/**
 * URL for fetching Pi-hole `Queries overtime`
 *
 * @remarks full URL `/api/queries/overtime`
 */
export const getQueriesOvertimeUrl = 'queries/overtime';
