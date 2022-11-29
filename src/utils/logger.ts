import { Signale, SignaleOptions } from 'signale';

// Signale options
// obtained from
//    https://github.com/klaussinani/signale#custom-loggers
export const options: SignaleOptions = {
  disabled: false,
  interactive: false,
  // https://github.com/klaudiosinani/signale#loglevel
  logLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  secrets: [process.env.SECRET_COOKIE_PASSWORD],
  stream: process.stdout,
};

/**
 * Signale logger instantiated
 *
 * @remarks available log types
 *  - await()
 *  - complete()
 *  - error()
 *  - debug()
 *  - fatal()
 *  - fav()
 *  - info()
 *  - note()
 *  - pause()
 *  - pending()
 *  - star()
 *  - start()
 *  - success()
 *  - wait()
 *  - warn()
 *  - watch()
 *  - log()
 *
 * @see {@link Signale#DefaultMethods}
 */
const logger = new Signale(options);

export default logger;
