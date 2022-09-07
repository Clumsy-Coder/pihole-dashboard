/**
 * URL for fetching session
 * @returns URL for fetching session
 */
export const getAuthSessionUrl = () => `/api/auth/session`;

/**
 * URL for logging in to Pi-hole
 * @returns URL for logging in
 */
export const postAuthSessionUrl = () => `/api/auth/login`;

/**
 * URL for logging out of Pi-hole
 * @returns URL for logging out
 */
export const deleteAuthSessionUrl = () => `/api/auth/logout`;
