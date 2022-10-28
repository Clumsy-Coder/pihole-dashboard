import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { clientOvertimeAndNamesUrl } from '@utils/url/upstream';
import { IClientNames, IClientsOvertime } from '@utils/url/upstream.types';
import { getClientsOvertimeUrl as apiUrl } from '@utils/url/api';

/**
 * Error message to return to the Requester
 */
interface ErrorMessage {
  message: string;
}

/**
 * `overtimeDataClients` and `getClientNames` data format obtained from Pi-hole
 */
export type IGetClientsOvertimeResponseData = IClientNames & IClientsOvertime;

/**
 * GET endpoint for `/api/queries/clients/overtime`
 *
 * Data returned is in raw format
 *
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetClientsOvertimeRaw = (
  req: NextApiRequest,
  res: NextApiResponse<IGetClientsOvertimeResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;

  const requestUrl = `http://${ipAddress}:${port}/${clientOvertimeAndNamesUrl()}&auth=${password}`;

  axios
    .get<IGetClientsOvertimeResponseData>(requestUrl)
    .then((response) => {
      getLogger.info('data obtained from upstream');
      res.status(200).json(response.data);
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
 * HTTP API endpoint `/api/queries/clients/overtime`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      handleGetClientsOvertimeRaw(req, res);
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
