// upstream API obtained from
// https://discourse.pi-hole.net/t/pi-hole-api/1863
//
// To be able to fetch from endpoint that requires Authentication
// https://discourse.pi-hole.net/t/how-to-auth-when-accessing-the-pihole-api-from-python/4254/2

export const upstreamBaseApiUrl = '/admin/api.php';

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'summaryRaw' to upstream API.
 * Gives statistics in raw format (no number formatting applied).
 *
 * @remarks No Authorization required
 * @see {@link ISummaryRaw} Data format returned
 * @returns API URL for upstream API
 */
export const summaryRawUrl = () => `${upstreamBaseApiUrl}?summaryRaw`;

/**
 * API url to fetch 'summary' to upstream API.
 * Gives statistics in formatted style
 *
 * @remarks No Authorization required
 * @see {@link ISummary} Data format returned
 * @returns API URL for upstream API
 */
export const summaryUrl = () => `${upstreamBaseApiUrl}?summary`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'overTimeData10mins' to upstream API.
 * Data needed for generating the domains/ads over time graph on the Pi-hole web dashboard
 *
 * @remarks No Authorization required
 * @see {@link IOverTimeData10minutes} Data format returned
 * @returns API URL for upstream API
 */
export const overTimeData10minsUrl = () => `${upstreamBaseApiUrl}?overTimeData10mins`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'topItems' to upstream API.
 * Data needed for generating the Top Domain and Top Advertisers Lists
 *
 * @remarks Authorization required
 * @see {@link ITopItems} Data format returned
 * @param numEntries - Number of entries to return. Default is 10
 * @returns API URL for upstream API
 */
export const topItemsUrl = (numEntries = 10) => `${upstreamBaseApiUrl}?topItems=${numEntries}`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'topClients' to upstream API.
 * Data needed for generating the Top Clients list
 *
 * @remarks Authorization required
 * @see {@link ITopClients} Data format returned
 * @param numEntries - Number of entries to return. Default is 10
 * @returns API URL for upstream API
 */
export const topClientsUrl = (numEntries = 10) => `${upstreamBaseApiUrl}?topClients=${numEntries}`;

/**
 * API url to fetch 'topClientsBlocked' to upstream API.
 * Data needed for generating the Top Clients Blocked list
 *
 * @remarks Authorization required
 * @see {@link ITopClientsBlocked} Data format returned
 * @param numEntries - Number of entries to return. Default is 10
 * @returns API URL for upstream API
 */
export const topBlockedClientsUrl = (numEntries = 10) =>
  `${upstreamBaseApiUrl}?topClientsBlocked=${numEntries}`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'getForwardDestinations' from upstream API.
 * Data needed for generating forwarded destination queries
 *
 * @see {@link IForwardDestination } Data format returned
 * @remarks Authorization required
 * @returns API URL for upstream API
 */
export const forwardedDestinationsUrl = () => `${upstreamBaseApiUrl}?getForwardDestinations`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch `getQueryTypes` from upstream API
 * Data needed for generating Query Types
 *
 * @see {@link IQueryTypes }
 * @remarks Authorization required
 * @returns API URL for upstream API
 */
export const queryTypesUrl = () => `${upstreamBaseApiUrl}?getQueryTypes`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //
