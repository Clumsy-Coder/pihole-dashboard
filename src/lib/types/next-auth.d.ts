// import { type JWT } from 'next-auth/jwt';
// import { type Session } from 'next-auth';

// https://next-auth.js.org/getting-started/typescript#module-augmentation

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

/**
 * Data structure to use when storing user auth in next-auth
 */
export interface IUser {
  // id: number
  /**
   * IPv4 address of Pi-Hole
   */
  ipAddress: string;
  /**
   * Port number for Pi-hole admin portal web server
   */
  port: string;
  /**
   * Password for Pi-hole admin portal
   */
  password: string;
}

/**
 * Data structure to use when calling next-auth callback for `session`
 */
export interface ISession extends Pick<Session, 'expires'> {
  user: omit<IUser, 'password'>;
}

declare module 'next-auth/jwt' {
  interface JWT {
    /**
     * Data structure used to store Pi-Hole credentials in JWT
     */
    user: IUser;
  }
  // type User = User
  interface User extends IUser { }
}

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth' {
  interface Session {
    user: omit<IUser, 'password'>;
  }

  // interface User {
  //   id: number;
  //   ipAddress: string;
  //   port: string;
  //   password: string;
  // }

  interface User extends omit<IUser, 'password'> {
    id: number;
  }

  // interface DefaultUser extends omit<IUser, 'password' | 'id'> {}

}
