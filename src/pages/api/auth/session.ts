import { NextApiRequest, NextApiResponse } from 'next';

import { IAuthSession, withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';

/**
 * Get Login session.
 * If there's a session cookie, it will return ip address and port number.
 * If there's no session cookie, it will return empty strings for ip address and port number.
 *
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGet = (req: NextApiRequest, res: NextApiResponse<IAuthSession>) => {
  const getLogger = logger.scope('/api/auth/session', 'GET');

  getLogger.info(`checking is auth session exists`);

  if (req.session.authSession) {
    const { ipAddress, port } = req.session.authSession;
    const resObj: IAuthSession = {
      ipAddress,
      port,
      password: '',
    };

    getLogger.complete(`auth session found. returning '${JSON.stringify(resObj, null, 2)}'`);

    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.status(200).json(resObj);
  } else {
    const resObj: IAuthSession = {
      ipAddress: '',
      port: '',
      password: '',
    };

    getLogger.complete(`auth session NOT found. returning ${JSON.stringify(resObj, null, 2)}`);

    res.status(200).json(resObj);
  }
};

/**
 * Default method to run when executing this http api endpoint
 *
 * @remarks
 * HTTP API endpoint `/api/auth/session`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const mainHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      handleGet(req, res);
      break;
    }
    default: {
      logger.error({
        prefix: `/api/auth/session`,
        message: `invalid HTTP method type '${method}'`,
      });
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withSessionRoute(mainHandler);
