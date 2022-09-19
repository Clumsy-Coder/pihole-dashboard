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
export const summaryRaw = () => `${upstreamBaseApiUrl}?summaryRaw`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'summary' to upstream API.
 * Gives statistics in formatted style
 *
 * @remarks No Authorization required
 * @see {@link ISummary} Data format returned
 * @returns API URL for upstream API
 */
export const summary = () => `${upstreamBaseApiUrl}?summary`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'overTimeData10mins' to upstream API.
 * Data needed for generating the domains/ads over time graph on the Pi-hole web dashboard
 *
 * @remarks No Authorization required
 * @see {@link IOverTimeData10minutes} Data format returned
 * @returns API URL for upstream API
 */
export const overTimeData10mins = () => `${upstreamBaseApiUrl}?overTimeData10mins`;

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
export const topItems = (numEntries = 10) => `${upstreamBaseApiUrl}?topItems=${numEntries}`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'getQuerySources' to upstream API.
 * Data needed for generating the Top Clients list
 *
 * @remarks Authorization required
 * @see {@link IGetQuerySources} Data format returned
 * @param numEntries - Number of entries to return. Default is 10
 * @returns API URL for upstream API
 */
export const topClients = (numEntries = 10) => `${upstreamBaseApiUrl}?topClients=${numEntries}`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * API url to fetch 'getForwardDestinations' from upstream API.
 * Data needed for generating forwarded destination queries
 *
 * @see {@link IForwardDestination } Data format returned
 * @remarks Authorization required
 * @returns API URL for upstream API
 */
export const forwardedDestinations = () => `${upstreamBaseApiUrl}?getForwardDestinations`;

// ////////////////////////////////////////////////////////////////////////////////////////////// //
