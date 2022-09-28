import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { queryTypes as queryTypesUrl } from '@utils/url/upstream';
import { IQueryTypes } from '@utils/url/upstream.types';

const apiUrl = '/api/queryTypes';

/**
 * Error message to return to the Requester
 */
interface ErrorMessage {
  message: string;
}

/**
 * Summary 'formatted' data to return
 */
export type IGetQueryTypesResponseData = IQueryTypes;

/**
 * GET endpoint for /api/queryTypes
 *
 * @remarks
 * Returns forwarded destinations query data
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetQueryTypes = (
  req: NextApiRequest,
  res: NextApiResponse<IGetQueryTypesResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;
  const requestUrl = `http://${ipAddress}:${port}/${queryTypesUrl()}&auth=${password}`;

  axios
    .get<IQueryTypes>(requestUrl)
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
 * HTTP API endpoint `/api/queryTypes`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      handleGetQueryTypes(req, res);
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
