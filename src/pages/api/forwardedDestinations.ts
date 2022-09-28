import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { forwardedDestinations as forwardedDestinationsUrl } from '@utils/url/upstream';
import { IForwardedDestinations } from '@utils/url/upstream.types';

const apiUrl = '/api/forwardedDestinations';

/**
 * Error message to return to the Requester
 */
interface ErrorMessage {
  message: string;
}

/**
 * Summary 'formatted' data to return
 */
export type IGetForwardedDestinationsResponseData = IForwardedDestinations;

/**
 * GET endpoint for /api/forwardedDestinations
 *
 * @remarks
 * Returns forwarded destinations query data
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetForwardedDestinations = (
  req: NextApiRequest,
  res: NextApiResponse<IGetForwardedDestinationsResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;
  const requestUrl = `http://${ipAddress}:${port}/${forwardedDestinationsUrl()}&auth=${password}`;

  axios
    .get<IForwardedDestinations>(requestUrl)
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
 * HTTP API endpoint `/api/forwardedDestinations`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      handleGetForwardedDestinations(req, res);
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