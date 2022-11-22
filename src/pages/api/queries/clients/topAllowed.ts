import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { UpstreamApiUrl } from '@utils/url/upstream';
import { ITopClientsData, ITopClients } from '@utils/url/upstream.types';
import { getTopAllowedClientsUrl as apiUrl } from '@utils/url/api';

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
export type IGetTopClientsResponseData = ITopClientsData;

/**
 * GET endpoint for `/api/queries/clients/topAllowed`
 *
 * @remarks
 * Returns forwarded destinations query data
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetTopClients = (
  req: NextApiRequest,
  res: NextApiResponse<IGetTopClientsResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;
  const { numEntries = 10 } = req.query as IGetRequestData;

  const requestUrl = new UpstreamApiUrl(ipAddress, port, password).topClients(numEntries);

  axios
    .get<ITopClients>(requestUrl)
    .then((response) => {
      getLogger.info('data obtained from upstream');
      res.status(200).json(response.data.top_sources);
      getLogger.complete(`sending response`);
      getLogger.debug(`response data: `, response.data.top_sources);
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
 * HTTP API endpoint `/api/queries/clients/topAllowed`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      handleGetTopClients(req, res);
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
