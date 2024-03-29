declare namespace NodeJS {
  /**
   * Environment variables loaded from file `.env.local`
   */
  export interface ProcessEnv {
    /**
     * NextJS project version
     *
     * @remarks Production build version: Major.Mainor.Patch
     * @example 1.1.0
     *
     * @remarks Development build version: Major.Minor.Patch-dev-\{dirty | clean\}
     * @example 1.0.0-development.2-dev-dirty
     *
     * @remarks will use `dirty` if the git has changed files that are not committed.
     * @remarks will use `clean` if the git has no files to commit
     */
    NEXT_PUBLIC_BUILD_VERSION: string;
    /**
     * Latest git commit ID
     *
     * @example a7d452f
     */
    NEXT_PUBLIC_BUILD_ID: string;

    // ------------------------------------------------------------------------------------------ //

    /**
     * Password used to encrypt cookie using iron-session
     *
     * @see {@link https://github.com/vvo/iron-session#nextjs-usage}
     */
    SECRET_COOKIE_PASSWORD: string;
    /**
     * Time amount of time (in seconds) the encrypted cookie is valid for.
     * @remarks has to be at least greater than 60
     *
     * @see {@link https://github.com/vvo/iron-session#ironoptions}
     */
    SECURE_COOKIE_TTL: number;

    /**
     * Fetch polling time when fetching data from api `/api/auth/session`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_AUTH_SESSION: number;

    // ------------------------------------------------------------------------------------------ //

    /**
     * Fetch polling time when fetching data from api `/api/summary`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_SUMMARY: number;

    // ------------------------------------------------------------------------------------------ //

    /**
     * Fetch polling time when fetching data from api `/api/forwardedDestinations`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_FORWARDED_DESTINATIONS: number;

    // ------------------------------------------------------------------------------------------ //

    /**
     * Fetch polling time when fetching data from api `/api/queryTypes`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_QUERY_TYPES: number;

    // ------------------------------------------------------------------------------------------ //

    /**
     * Fetch polling time when fetching data from api `/api/queries/topPermitted`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_TOP_PERMITTED_QUERIES: number;

    /**
     * Fetch polling time when fetching data from api `/api/queries/topBlocked`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_TOP_BLOCKED_QUERIES: number;

    /**
     * Number of entries to fetch from api `/api/queries/topPermitted`
     */
    NEXT_PUBLIC_NUM_ENTRIES_TOP_PERMITTED_QUERIES: number;

    /**
     * Number of entries to fetch from api `/api/queries/topBlocked`
     */
    NEXT_PUBLIC_NUM_ENTRIES_TOP_BLOCKED_QUERIES: number;

    // ------------------------------------------------------------------------------------------ //

    /**
     * Fetch polling time when fetching data from api `/api/queries/clients/topAllowed`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_TOP_CLIENTS_ALLOWED_QUERIES: number;

    /**
     * Fetch polling time when fetching data from api `/api/queries/clients/topBlocked`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_TOP_CLIENTS_BLOCKED_QUERIES: number;

    /**
     * Number of entries to fetch from api `/api/queries/clients/topAllowed`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_NUM_ENTRIES_TOP_CLIENTS_ALLOWED_QUERIES: number;

    /**
     * Number of entries to fetch from api `/api/queries/topClientsBlocked`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_NUM_ENTRIES_TOP_CLIENTS_BLOCKED_QUERIES: number;

    /**
     * Fetch polling time when fetching data from api `/api/queries/overtime`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_QUERIES_OVERTIME: number;

    /**
     * Fetch polling time when fetching data from api `/api/queries/clients/overtime`
     *
     * @remarks Used by Redux toolkit Query React hook when providing `pollingInterval`
     */
    NEXT_PUBLIC_POLLING_CLIENTS_OVERTIME: number;
  }
}
