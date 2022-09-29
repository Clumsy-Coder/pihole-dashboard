import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { topItems as topItemsUrl } from '@utils/url/upstream';
import { ITopPermittedQueries, ITopItems } from '@utils/url/upstream.types';
import { getTopPermittedQueriesUrl as apiUrl } from '@utils/url/api';

/**
 * Error message to return to the Requester
 */
interface ErrorMessage {
  message: string;
}

/**
 * API endpoint query parameters
 */
export interface IGetRequestData {
  /**
   * The number of entries to return
   *
   * @remarks defaults to 10
   */
  numEntries?: number;
}

/**
 * Summary 'formatted' data to return
 */
export type IGetTopPermittedQueriesResponseData = ITopPermittedQueries;

/**
 * GET endpoint for /api/queries/topPermitted
 *
 * @remarks
 * Returns forwarded destinations query data
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetTopPermittedQueries = (
  req: NextApiRequest,
  res: NextApiResponse<IGetTopPermittedQueriesResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;
  const { numEntries = 10 } = req.query as IGetRequestData;

  const requestUrl = `http://${ipAddress}:${port}/${topItemsUrl(numEntries)}&auth=${password}`;

  axios
    .get<ITopItems>(requestUrl)
    .then((response) => {
      getLogger.info('data obtained from upstream');
      getLogger.debug(`data: `, response.data.top_queries);
      res.status(200).json(response.data.top_queries);
      getLogger.complete(`sending response`);
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
 * HTTP API endpoint `/api/queries/topPermitted`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      handleGetTopPermittedQueries(req, res);
      break;
    }
    default: {
      logger.error({
        prefix: apiUrl,
        message: `invalid HTTP method type '${method}'`,
      });
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withSessionRoute(requestHandler);
