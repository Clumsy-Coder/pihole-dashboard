/* eslint-disable import/prefer-default-export  */

import logger from '@utils/logger';

/**
 * Upstream API class used for generating URL for fetching data from Pi-hole API.
 *
 * The intended use is to abstract the url used to make a request to Pi-hole API.
 *
 * This will be used in NextJS API
 *
 */
export class UpstreamApiUrl {
  /**
   * Upstream base url for contacting Pi-hole API
   *
   * upstream API obtained from
   * https://discourse.pi-hole.net/t/pi-hole-api/1863
   *
   * To be able to fetch from endpoint that requires Authentication
   * https://discourse.pi-hole.net/t/how-to-auth-when-accessing-the-pihole-api-from-python/4254/2
   */
  readonly #upstreamBaseApiUrl = 'admin/api.php';

  /**
   * IP address of Pi-hole
   */
  #ipAddress = '';

  /**
   * Port number of Pi-hole Admin portal
   */
  #port = '';

  /**
   * Password for Pi-hole Admin portal authentication
   */
  #password = '';

  // /////////////////////////////////////////////////////////////////////////////////////////// //

  /**
   * Constructor for this class.
   *
   * Sets `ipAddress` to empty strings
   * Sets `port` to empty strings
   * Sets `password` to empty strings
   */
  public constructor(ipAddress: string, port: string, password: string) {
    this.#ipAddress = ipAddress;
    this.#port = port;
    this.#password = password;

    // this is to hide hashed password when printing a log
    // check link
    //   https://github.com/klaudiosinani/signale#secrets-filtering
    //   https://github.com/klaudiosinani/signale#signaleaddsecretssecrets
    logger.addSecrets([password]);
  }

  // /////////////////////////////////////////////////////////////////////////////////////////// //

  /**
   * API url used to contact Pi-hole API
   */
  private upstreamApiUrl() {
    return `http://${this.#ipAddress}:${this.#port}/${this.#upstreamBaseApiUrl}?auth=${this.#password
      }`;
  }

  // /////////////////////////////////////////////////////////////////////////////////////////// //
  // Upstream url builder

  /**
   * API url to fetch 'summary' to upstream API.
   * Gives statistics in formatted style
   *
   * @remarks No Authorization required
   * @see {@link ISummary} Data format returned
   * @returns API URL for upstream API
   */
  public summary() {
    return `${this.upstreamApiUrl()}&summary`;
  }

  /**
   * API url to fetch 'summaryRaw' to upstream API.
   * Gives statistics in raw format (no number formatting applied).
   *
   * @remarks No Authorization required
   * @see {@link ISummaryRaw} Data format returned
   * @returns API URL for upstream API
   */
  public summaryRaw() {
    return `${this.upstreamApiUrl()}&summaryRaw`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch 'overTimeData10mins' to upstream API.
   * Data needed for generating the domains/ads over time graph on the Pi-hole web dashboard
   *
   * @remarks No Authorization required
   * @see {@link IOverTimeData10minutes} Data format returned
   * @returns API URL for upstream API
   */
  overTimeData10mins() {
    return `${this.upstreamApiUrl()}&overTimeData10mins`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch 'topItems' to upstream API.
   * Data needed for generating the Top Domain and Top Advertisers Lists
   *
   * @remarks Authorization required
   * @see {@link ITopItems} Data format returned
   * @param numEntries - Number of entries to return. Default is 10
   * @returns API URL for upstream API
   */
  topItems(numEntries = 10) {
    return `${this.upstreamApiUrl()}&topItems=${numEntries}`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch 'topClients' to upstream API.
   * Data needed for generating the Top Clients list
   *
   * @remarks Authorization required
   * @see {@link ITopClients} Data format returned
   * @param numEntries - Number of entries to return. Default is 10
   * @returns API URL for upstream API
   */
  topClients(numEntries = 10) {
    return `${this.upstreamApiUrl()}&topClients=${numEntries}`;
  }

  /**
   * API url to fetch 'topClientsBlocked' to upstream API.
   * Data needed for generating the Top Clients Blocked list
   *
   * @remarks Authorization required
   * @see {@link ITopClientsBlocked} Data format returned
   * @param numEntries - Number of entries to return. Default is 10
   * @returns API URL for upstream API
   */
  topBlockedClients(numEntries = 10) {
    return `${this.upstreamApiUrl()}&topClientsBlocked=${numEntries}`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch 'getForwardDestinations' from upstream API.
   * Data needed for generating forwarded destination queries
   *
   * @see {@link IForwardDestination } Data format returned
   * @remarks Authorization required
   * @returns API URL for upstream API
   */
  forwardedDestinations() {
    return `${this.upstreamApiUrl()}&getForwardDestinations`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch `getQueryTypes` from upstream API
   * Data needed for generating Query Types
   *
   * @see {@link IQueryTypes }
   * @remarks Authorization required
   * @returns API URL for upstream API
   */
  queryTypes() {
    return `${this.upstreamApiUrl()}&getQueryTypes`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch `getClientNames` from upstream API
   *
   * @see {@link IClientNames}
   * @remarks Authorization required
   * @returns API url for upstream API
   */
  clientNames() {
    return `${this.upstreamApiUrl()}&getClientNames`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch `overTimeDataClients` from upstream API
   *
   * @see {@link IClientsOvertime}
   * @remarks Authorization required
   * @returns API url for upstream API
   */
  clientsOvertime() {
    return `${this.upstreamApiUrl()}&overTimeDataClients`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch `overTimeDataClients` and `getClientNames` from upstream API
   *
   * @see {@link clientNamesUrl}
   * @see {@link clientsOvertimeUrl}
   * @remarks Authorization required
   * @returns API url for upstream API
   */
  clientOvertimeAndNames() {
    return `${this.upstreamApiUrl()}&overTimeDataClients&getClientNames`;
  }

  // ------------------------------------------------------------------------------------------- //

  /**
   * API url to fetch `getAllQueries` from upstream API
   *
   * @remarks Authorization required
   * @returns API url for upstream API
   *
   * @see {@link https://github.com/pi-hole/AdminLTE/blob/b29a423b9553654f113bcdc8a82296eb6e4613d7/scripts/pi-hole/js/queries.js#L55-L76}
   * @see {@link https://github.com/pi-hole/AdminLTE/blob/b29a423b9553654f113bcdc8a82296eb6e4613d7/api_FTL.php#L278-L337}
   *
   * @param numEntries - Number of entries to return
   * @param from - fetch queries starting from a date/time. Format in Unix time
   * @param until - fetch queries before a date/time. Format in Unix time
   * @param client - fetch queries from a client. Ex: iPad.local
   * @param domain - fetch queries of a domain name. Ex: google.com
   * @param queryType - fetch queries of a specific query type. Ex: A, AAAA, HTTPS
   * @param forwardDest - fetch queries that have been forwarded to. Ex: `blocked (gravity)`, `blocked(exact blacklist)`
   */
  allQueries(
    numEntries = 100,
    from?: string,
    until?: string,
    client?: string,
    domain?: string,
    queryType?: string,
    forwardDest?: string,
    // type: string,
  ) {
    let url = `${this.upstreamApiUrl()}&getAllQueries`;

    url += numEntries ? `=${numEntries}` : '';
    url += from ? `&from=${from}` : '';
    url += until ? `&until=${until}` : '';
    url += client ? `&client=${client}` : '';
    url += domain ? `&domain=${domain}` : '';
    url += queryType ? `&querytype=${queryType}` : '';
    url += forwardDest ? `&forwarddest=${forwardDest}` : '';
    // url += type ? `&type=${forwardDest}` : ''

    return url;
  }
}

// ////////////////////////////////////////////////////////////////////////////////////////////// //
