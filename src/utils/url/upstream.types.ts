/**
 * Data format when fetching 'summaryRaw' from pi-hole API
 */
export interface ISummaryRaw {
  /**
   * Total number of Domains on a blocklist
   * @example 99867
   */
  domains_being_blocked: number;
  /**
   * Total number of DNS queries today
   * @example 2317
   */
  dns_queries_today: number;
  /**
   * Total number of DNS queries blocked today
   * @example 4241
   */
  ads_blocked_today: number;
  /**
   * Percentage of total queries blocked today against total queries
   * ads_blocked_today / dns_queries_today
   * @example 18.349450
   */
  ads_percentage_today: number;
  /**
   * Number of unique domains queried
   */
  unique_domains: number;
  /**
   * Number of queries forwarded
   */
  queries_forwarded: number;
  /**
   * Number of queries cached
   */
  queries_cached: number;
  /**
   * Number of clients seen
   */
  clients_ever_seen: number;
  /**
   * Number of unique clients
   */
  unique_clients: number;
  /**
   * Number of DNS queries for all types
   */
  dns_queries_all_types: number;
  /**
   * Number of UNKNOWN queries
   */
  reply_UNKNOWN: number;
  /**
   * Number of NODATA queries
   */
  reply_NODATA: number;
  /**
   * Number of NXDOMAIN queries
   */
  reply_NXDOMAIN: number;
  /**
   * Number of CNAME queries
   */
  reply_CNAME: number;
  /**
   * Number of IP queries
   */
  reply_IP: number;
  /**
   * Number of DOMAIN queries
   */
  reply_DOMAIN: number;
  /**
   * Number of RRNAME queries
   */
  reply_RRNAME: number;
  /**
   * Number of SERVFAIL queries
   */
  reply_SERVFAIL: number;
  /**
   * Number of REFUSED queries
   */
  reply_REFUSED: number;
  /**
   * Number of NOTIMP queries
   */
  reply_NOTIMP: number;
  /**
   * Number of OTHER queries
   */
  reply_OTHER: number;
  /**
   * Number of DNSSEC queries
   */
  reply_DNSSEC: number;
  /**
   * Number of NONE queries
   */
  reply_NONE: number;
  /**
   * Number of BLOB queries
   */
  reply_BLOB: number;
  /**
   * Number of queries answered
   */
  dns_queries_all_replies: number;
  /**
   * Pi-hole privacy level
   */
  privacy_level: number;
  /**
   * Whether pi-hole is "enabled" or "disabled"
   */
  status: 'enabled' | 'disabled';
  /**
   * Last time Gravity was updated
   */
  gravity_last_updated: {
    file_exists: boolean;
    /**
     * Gravity last updated in unix time
     */
    absolute: number;
    /**
     * Gravity last updated
     */
    relative: {
      days: number;
      hours: number;
      minutes: number;
    };
  };
}

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Data format when fetching 'summary' from pi-hole API
 * The data is formatted to be human readable
 *
 * @remarks Has the same keys as ISummaryRaw. The values are type 'string'
 * @see {@link ISummaryRaw}
 */
// export interface ISummary
//   extends Omit<
//     ISummaryRaw,
//     'domains_being_blocked' | 'dns_queries_today' | 'ads_blocked_today' | 'ads_percentage_today'
//   > {
export interface ISummary {
  /**
   * Total number of Domains on a blocklist.
   *
   * Pretty formatted
   * @example 99867 becomes 99,867
   */
  domains_being_blocked: string;
  /**
   * Total number of DNS queries today
   * @example 2317 becomes 2,317
   */
  dns_queries_today: string;
  /**
   * Total number of DNS queries blocked today
   * @example 4241 becomes 4,241
   */
  ads_blocked_today: string;
  /**
   * Percentage of total queries blocked today against total queries
   * ads_blocked_today / dns_queries_today
   * @example 18.349450 becomes 18.3
   */
  ads_percentage_today: string;
  /**
   * Number of unique domains queried
   */
  unique_domains: string;
  /**
   * Number of queries forwarded
   */
  queries_forwarded: string;
  /**
   * Number of queries cached
   */
  queries_cached: string;
  /**
   * Number of clients seen
   */
  clients_ever_seen: string;
  /**
   * Number of unique clients
   */
  unique_clients: string;
  /**
   * Number of DNS queries for all types
   */
  dns_queries_all_types: string;
  /**
   * Number of UNKNOWN queries
   */
  reply_UNKNOWN: string;
  /**
   * Number of NODATA queries
   */
  reply_NODATA: string;
  /**
   * Number of NXDOMAIN queries
   */
  reply_NXDOMAIN: string;
  /**
   * Number of CNAME queries
   */
  reply_CNAME: string;
  /**
   * Number of IP queries
   */
  reply_IP: string;
  /**
   * Number of DOMAIN queries
   */
  reply_DOMAIN: string;
  /**
   * Number of RRNAME queries
   */
  reply_RRNAME: string;
  /**
   * Number of SERVFAIL queries
   */
  reply_SERVFAIL: string;
  /**
   * Number of REFUSED queries
   */
  reply_REFUSED: string;
  /**
   * Number of NOTIMP queries
   */
  reply_NOTIMP: string;
  /**
   * Number of OTHER queries
   */
  reply_OTHER: string;
  /**
   * Number of DNSSEC queries
   */
  reply_DNSSEC: string;
  /**
   * Number of NONE queries
   */
  reply_NONE: string;
  /**
   * Number of BLOB queries
   */
  reply_BLOB: string;
  /**
   * Number of queries answered
   */
  dns_queries_all_replies: string;
  /**
   * Pi-hole privacy level
   */
  privacy_level: string;
  /**
   * Whether pi-hole is "enabled" or "disabled"
   */
  status: 'enabled' | 'disabled';
  /**
   * Last time Gravity was updated
   */
  gravity_last_updated: {
    file_exists: boolean;
    /**
     * Gravity last updated in unix time
     */
    absolute: number;
    /**
     * Gravity last updated
     */
    relative: {
      days: number;
      hours: number;
      minutes: number;
    };
  };
}

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Data formatted needed when fetching 'overTimeData10mins'
 * Data needed for generating the domains/ads over time graph on the Pi-hole web dashboard
 */
export interface IOverTimeData10minutes {
  /**
   * the number of queries within the timeframe of 00:00:00 - 00:09:59 at this day.
   */
  domains_over_time: {
    /**
     * Key is unix time
     * Value is number of queries
     *
     * @example
     * ```
     * { "1488150000": 12 }
     * ```
     */
    string: number;
  };
  /**
   * the number of queries within the timeframe of 00:10:00 - 00:19:59 at this day.
   */
  ads_over_time: {
    /**
     * Key is unix time
     * Value is number of queries
     *
     * @example
     * ```
     * { "1488150000": 12 }
     * ```
     */
    string: number;
  };
}

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Data formatted needed when fetching 'topItems'
 * Data needed for generating the Top Domain and Top Advertisers Lists
 */
export interface ITopItems {
  /**
   * Top queries returned.
   *
   * Could contain non-ads or ads queries
   */
  top_queries: {
    /**
     * Key is the domain
     * Value is number of queries
     *
     * @example
     * ```
     * { 'pi-hole.net': 80 }
     * ```
     */
    string: number;
  };
  /**
   * Top ads returned
   *
   * @example
   * ```
   * { 'www.googleadservices.com': 80 }
   * ```
   */
  top_ads: {
    /**
     * Key is the domain
     * Value is number of queries
     */
    string: number;
  };
}

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Data formatted needed when fetching 'getQuerySources'
 * Data needed for generating the Top Clients list
 */
export interface ITopClients {
  top_sources: {
    /**
     * Key is the domain
     * Value is number of queries
     *
     * @example
     * ```json
     * {
     *    "desktop.local|192.168.1.2": 1440,
     *    "android-a4.local|192.168.1.3": 609,
     *    "localhost|127.0.0.1": 186,
     *    "android-53.local|192.168.1.4": 120,
     *    "android-86.local|192.168.1.5": 62
     * }
     * ```
     */
    string: number;
  };
}

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Data format needed when fetching 'getForwardDestinations'
 * Data needed for generating the forward destination queries
 */
export interface IForwardedDestinations {
  forward_destinations: {
    /**
     * Key is the destination forwarded to
     * Value is the percentage being forward to
     *
     * @example
     * ```json
     * "forward_destinations": {
     *   "blocked|blocked": 19.21,
     *   "cached|cached": 11.38,
     *   "other|other": 0.53,
     *   "localhost#5335|127.0.0.1#5335": 67.44,
     *   "192.168.1.254#53|192.168.1.254#53": 1.45
     * }
     * ```
     */
    string: number;
  };
}

// ////////////////////////////////////////////////////////////////////////////////////////////// //
// ////////////////////////////////////////////////////////////////////////////////////////////// //
// ////////////////////////////////////////////////////////////////////////////////////////////// //
