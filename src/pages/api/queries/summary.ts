import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { withSessionRoute } from '@lib/AuthSession';
import { IUser } from '@lib/types/next-auth';
import logger from '@utils/logger';
import { UpstreamApiUrl } from '@utils/url/upstream';
import { ISummary, ISummaryRaw } from '@utils/url/upstream.types';

/**
 * API endpoint query parameters
 */
export interface IGetRequestData {
  /**
   * Return data in 'raw' form if true.
   * Return data in 'formatted' form if false
   */
  raw?: boolean;
}

/**
 * Error message to return to the Requester
 */
interface ErrorMessage {
  message: string;
}

/**
 * Summary 'raw' data to return
 */
export type IGetSummaryRawResponseData = ISummaryRaw;

/**
 * Summary 'formatted' data to return
 */
export type IGetSummaryResponseData = ISummary;

/**
 * GET endpoint for /api/summary
 *
 * @remarks
 * Returns data in raw form
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */

const handleGetSummaryRaw = async (
  req: NextApiRequest,
  res: NextApiResponse<IGetSummaryRawResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope('/api/summary', 'GET', 'raw');

  const jwt = (await getToken({ req })) as IUser | null;

  getLogger.log('checking if jwt is set');
  if (!jwt || !jwt.ipAddress || !jwt.port || !jwt.password) {
    getLogger.error('jwt is NULL. Redirecting to /api/auth/unauthorized');
    res.redirect('/api/auth/unauthorized');
    return;
  }

  getLogger.info('pi-hole credentials are set in JWT');
  const { ipAddress, port, password } = jwt;

  getLogger.log('building url for upstream Pi-Hole api');
  const requestUrl = new UpstreamApiUrl(ipAddress, port, password).summaryRaw();
  getLogger.debug('upstream url: ', requestUrl);

  getLogger.log('sending request to upstream Pi-Hole api');
  axios
    .get<ISummaryRaw>(requestUrl)
    .then((response) => {
      getLogger.success('data obtained from upstream');
      getLogger.complete(`sending response: `);
      getLogger.debug('response data: ', response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      getLogger.error(`error returned when sending HTTP request to '${requestUrl}'`);
      res.status(500).json({ message: JSON.stringify(error) });
    });
};

/**
 * GET endpoint for /api/summary
 *
 * @remarks
 * Returns data in formatted form
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetSummary = async (
  req: NextApiRequest,
  res: NextApiResponse<IGetSummaryResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope('/api/summary', 'GET', 'formatted');

  const jwt = (await getToken({ req })) as IUser | null;

  getLogger.log('checking if jwt is set');
  if (!jwt || !jwt.ipAddress || !jwt.port || !jwt.password) {
    getLogger.error('jwt is NULL. Redirecting to /api/auth/unauthorized');
    res.redirect('/api/auth/unauthorized');
    return;
  }

  getLogger.info('pi-hole credentials are set in JWT');
  const { ipAddress, port, password } = jwt;

  getLogger.log('building url for upstream Pi-Hole api');
  const requestUrl = new UpstreamApiUrl(ipAddress, port, password).summary();
  getLogger.debug('upstream url: ', requestUrl);

  getLogger.log('sending request to upstream Pi-Hole api');
  axios
    .get<ISummary>(requestUrl)
    .then((response) => {
      getLogger.success('data obtained from upstream');
      getLogger.complete(`sending response: `);
      getLogger.debug('response data: ', response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      getLogger.error(`error returned when sending HTTP request to '${requestUrl}'`);
      res.status(500).json({ message: JSON.stringify(error) });
    });
};

/**
 * Default method to run when executing this http api endpoint
 *
 * @remarks
 * HTTP API endpoint `/api/summary`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      const { raw = false } = req.query as IGetRequestData;

      if (raw) {
        await handleGetSummaryRaw(req, res);
        break;
      } else {
        await handleGetSummary(req, res);
        break;
      }
    }
    default: {
      logger.error({ prefix: `/api/summary`, message: `invalid HTTP method type '${method}'` });
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withSessionRoute(requestHandler);
