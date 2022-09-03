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
