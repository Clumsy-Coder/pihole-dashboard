import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { UpstreamApiUrl } from '@utils/url/upstream';
import { IQueryData, IGetAllQueriesTransformed } from '@utils/url/upstream.types';
import { getAllQueriesUrl as apiUrl } from '@utils/url/api';

interface ErrorMessage {
  message: string;
}

export interface IGetRequestData {
  /**
   * The number of entries to return
   *
   * @remarks defaults to 100
   */
  numEntries?: number;
  /**
   * Return queries that start from time.
   * @remarks Format in Unix time
   */
  from?: number;
  /**
   * Return queries that are up to time.
   * @remarks Format in Unix time
   */
  until?: number;
  /**
   * Return queries that are related to the client
   * @remarks Client can be an IP address
   */
  client?: string;
  /** Return queries that related to a domain name
   *
   * @remarks Domain is the URL. Ex: google.com
   */
  domain?: string;
  /**
   * Return queries of a specific type
   * @remarks Query type example: A, AAAA, HTTPS
   */
  queryType?: string;
  /**
   * Return queries that have been forwarded to a destination
   * @remarks Can be a blocklist, forwarded to upstream
   */
  forwardDest?: string;
  type?: string;
}

export type IGetResponseData = IGetAllQueriesTransformed;

/**
 * GET endpoint for `/api/queries/allQueries`
 *
 * @remarks
 * Returns all Queries
 *
 * Must be authenticated
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetAllQueries = (
  req: NextApiRequest,
  res: NextApiResponse<IGetResponseData | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;
  const {
    numEntries = 100,
    from = undefined,
    until = undefined,
    client = undefined,
    domain = undefined,
    queryType = undefined,
    forwardDest = undefined,
    // type = undefined,
  } = req.query as IGetRequestData;

  const requestUrl = new UpstreamApiUrl(ipAddress, port, password).allQueries(
    numEntries,
    from,
    until,
    client,
    domain,
    queryType,
    forwardDest,
  );

  getLogger.debug(`generated url: `, requestUrl);

  res.status(200).json({ message: `generated url: ${requestUrl}` });
};

/**
 * Default method to run when executing this http api endpoint
 *
 * @remarks
 * HTTP API endpoint `/api/queries/allQueries`
 *
 * @remarks
 * HTTP method allowed: `GET`
 */
const requestHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'GET': {
      handleGetAllQueries(req, res);
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
