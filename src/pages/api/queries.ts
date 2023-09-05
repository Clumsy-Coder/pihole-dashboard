import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { UpstreamApiUrl } from '@utils/url/upstream';
import { IQueryData, IGetAllQueries, IQueryDataTransformed } from '@utils/url/upstream.types';
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
  numEntries?: string;
  /**
   * Return queries that start from time.
   * @remarks Format in Unix time
   */
  from?: string;
  /**
   * Return queries that are up to time.
   * @remarks Format in Unix time
   */
  until?: string;
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
   * @remarks When `domain` is provided, numEntries is ignored upstream
   */
  queryType?: string;
  /**
   * Return queries that have been forwarded to a destination
   * @remarks Can be a blocklist, forwarded to upstream
   */
  forwardDest?: string;
  type?: string;
}

export type IGetResponseData = IQueryDataTransformed[];

/**
 * Reply types
 *
 * @see {@link https://github.com/pi-hole/AdminLTE/blob/b29a423b9553654f113bcdc8a82296eb6e4613d7/scripts/pi-hole/js/queries.js#L13-L28}
 */
const replyTypes = [
  'N/A',
  'NODATA',
  'NXDOMAIN',
  'CNAME',
  'IP',
  'DOMAIN',
  'RRNAME',
  'SERVFAIL',
  'REFUSED',
  'NOTIMP',
  'upstream error',
  'DNSSEC',
  'NONE',
  'BLOB',
];

/**
 * DNSsec status types
 *
 * @see {@link https://github.com/pi-hole/AdminLTE/blob/b29a423b9553654f113bcdc8a82296eb6e4613d7/scripts/pi-hole/js/queries.js#L84-L103}
 */
const dnssecStatusTypes = ['SECURE', 'INSECURE', 'BOGUS', 'ABANDONED', 'UNKNOWN'];

const statusTypes = [
  'Blocked',
  'OK',
  'OK',
  'Blocked',
  'Blocked',
  'Blocked',
  'Blocked',
  'Blocked',
  'Blocked',
  'Blocked',
  'Blocked',
  'Retired',
  'OK',
  'Blocked',
  'Blocked',
  'OK',

]

/**
 * GET endpoint for `/api/queries`
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

  getLogger.debug(`query parameters: `, req.query);

  const requestUrl = new UpstreamApiUrl(ipAddress, port, password).allQueries(
    +numEntries,
    from,
    until,
    client,
    domain,
    queryType,
    forwardDest,
  );

  // getLogger.debug(`generated url: `, requestUrl);

  axios
    .get<IGetAllQueries>(requestUrl)
    .then((response) => {
      getLogger.info('data obtained from upstream');
      getLogger.info('transforming data to JSON');

      // convert data array into a formatted array
      // obtained from https://stackoverflow.com/a/64583158
      const formattedData: IQueryDataTransformed[] = response.data.data.map((cur: IQueryData) => {
        const [
          time,
          type,
          domainName,
          clientName,
          status,
          dnssecStatus,
          reply,
          responseTime,
          cnameDomain,
          regexID,
          upstreamDestination,
          extendedDnsError,
        ] = cur;

        return {
          time: +time,
          type,
          domain: domainName,
          client: clientName,
          status: +status,
          dnssecStatus: dnssecStatusTypes[+dnssecStatus - 1],
          reply: replyTypes[+reply],
          responseTime: +responseTime,
          cnameDomain,
          regexID,
          upstreamDestination,
          extendedDnsError: +extendedDnsError,
        };
      });

      getLogger.complete(`sending response: `);
      if (formattedData.length >= 10) {
        getLogger.debug(`${formattedData.length} entries`);
        getLogger.debug(
          `response data (limiting to 10 entries for logging only): `,
          formattedData.slice(0, 9),
        );
      } else {
        getLogger.debug(`response data`, formattedData);
      }
      res.status(200).json(formattedData);
    })
    .catch((error) => {
      getLogger.error(`error returned when sending HTTP request to '${requestUrl}'`);
      res.status(500).json({ message: JSON.stringify(error) });
    });

  // res.status(200).json({ message: `generated url: ${requestUrl}` });
};

/**
 * Default method to run when executing this http api endpoint
 *
 * @remarks
 * HTTP API endpoint `/api/queries`
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
