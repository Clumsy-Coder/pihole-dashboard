import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute, isApiAuthenticated } from '@lib/AuthSession';
import logger from '@utils/logger';
import { summaryRaw as summaryRawUrl } from '@utils/url/upstream';
import { ISummaryRaw } from '@utils/url/upstream.types';

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
 * GET endpoint for /api/summary
 *
 * @remarks
 * Returns data in raw form
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */

const handleGetSummaryRaw = (
  req: NextApiRequest,
  res: NextApiResponse<IGetSummaryRawResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope('/api/summary', 'GET', 'raw');
  const { ipAddress, port } = req.session.authSession;
  const requestUrl = `http://${ipAddress}:${port}/${summaryRawUrl()}`;

  axios
    .get<ISummaryRaw>(requestUrl)
    .then((response) => {
      getLogger.info('data obtained from upstream');
      getLogger.complete(`sending response: `, response.data);
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
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  // exit if the user is NOT authenticated
  if (!isApiAuthenticated(req)) {
    logger.error({ prefix: `/api/summary`, message: `user is not Authenticated` });
    logger.complete({ prefix: `/api/summary`, message: `aborting` });
    res.status(401).send('Not Authorized');

    return;
  }

  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      const { raw = false } = req.query as IGetRequestData;

      if (raw) {
        handleGetSummaryRaw(req, res);
        break;
      }
      break;
    }
    default: {
      logger.error({ prefix: `/api/summary`, message: `invalid HTTP method type '${method}'` });
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withSessionRoute(requestHandler);
