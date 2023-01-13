import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { summaryRawUrl, summaryUrl } from '@utils/url/upstream';
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

const handleGetSummaryRaw = (
  req: NextApiRequest,
  res: NextApiResponse<IGetSummaryRawResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope('/api/summary', 'GET', 'raw');
  const { ipAddress, port, password } = req.session.authSession;
  const requestUrl = `http://${ipAddress}:${port}/${summaryRawUrl()}&auth=${password}`;

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
 * GET endpoint for /api/summary
 *
 * @remarks
 * Returns data in formatted form
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetSummary = (
  req: NextApiRequest,
  res: NextApiResponse<IGetSummaryResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope('/api/summary', 'GET', 'formatted');
  const { ipAddress, port, password } = req.session.authSession;
  const requestUrl = `http://${ipAddress}:${port}/${summaryUrl()}&auth=${password}`;

  axios
    .get<ISummary>(requestUrl)
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
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      const { raw = false } = req.query as IGetRequestData;

      if (raw) {
        handleGetSummaryRaw(req, res);
        break;
      } else {
        handleGetSummary(req, res);
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
