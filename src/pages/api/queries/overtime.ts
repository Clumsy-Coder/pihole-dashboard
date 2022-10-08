import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { overTimeData10minsUrl } from '@utils/url/upstream';
import { IOverTimeData10minutes } from '@utils/url/upstream.types';
import { getQueriesOvertimeUrl as apiUrl } from '@utils/url/api';

/**
 * Error message to return to the Requester
 */
interface ErrorMessage {
  message: string;
}

/**
 * `overTimeData10mins` data format obtained from Pi-hole
 */
export type IGetQueriesOvertimeResponseData = IOverTimeData10minutes;

/**
 * GET endpoint for `/api/queries/overtime`
 *
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetQueriesOvertimeRaw = (
  req: NextApiRequest,
  res: NextApiResponse<IGetQueriesOvertimeResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;

  const requestUrl = `http://${ipAddress}:${port}/${overTimeData10minsUrl()}&auth=${password}`;

  axios
    .get<IOverTimeData10minutes>(requestUrl)
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
 * HTTP API endpoint `/api/queries/overtime`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      handleGetQueriesOvertimeRaw(req, res);
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
