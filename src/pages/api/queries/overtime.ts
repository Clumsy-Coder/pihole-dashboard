import axios from 'axios';
import { ChartData } from 'chart.js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { UpstreamApiUrl } from '@utils/url/upstream';
import { IOverTimeData10minutes } from '@utils/url/upstream.types';
import { getQueriesOvertimeUrl as apiUrl } from '@utils/url/api';

/**
 * Error message to return to the Requester
 */
interface ErrorMessage {
  message: string;
}

export interface IGetRequestData {
  /**
   * Return formatted data that is compatible with ChartJS
   *
   * @see {@link https://www.chartjs.org/docs/latest/general/data-structures.html}
   * @see {@link https://www.chartjs.org/docs/latest/charts/bar.html#example-dataset-configuration}
   *
   * @defaultValue `false`
   */
  formatted?: string;
}

/**
 * `overTimeData10mins` data format obtained from Pi-hole
 */
export type IGetQueriesOvertimeResponseData = IOverTimeData10minutes;

export type IGetQueriesOvertimeFormatted = ChartData<'bar', number[], number>;

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

  const requestUrl = new UpstreamApiUrl(ipAddress, port, password).overTimeData10mins();

  axios
    .get<IOverTimeData10minutes>(requestUrl)
    .then((response) => {
      getLogger.info('data obtained from upstream');
      res.status(200).json(response.data);
      getLogger.complete(`sending response`);
      getLogger.debug('response data: ', response.data);
    })
    .catch((error) => {
      getLogger.error(`error returned when sending HTTP request to '${requestUrl}'`);
      res.status(500).json({ message: JSON.stringify(error) });
    });
};

/**
 * GET endpoint for `/api/queries/overtime`
 *
 * returns formatted data for ChartJS and react-chartjs-2
 *
 * @see {@link https://github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js#L219-L286 | Code inspired by Pi-hole Admin portal}
 *
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetQueriesOvertimeFormatted = (
  req: NextApiRequest,
  res: NextApiResponse<IGetQueriesOvertimeFormatted | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;

  const requestUrl = new UpstreamApiUrl(ipAddress, port, password).overTimeData10mins();
  const responseData: IGetQueriesOvertimeFormatted = {
    labels: [], // unix time
    datasets: [],
  };

  axios
    .get<IOverTimeData10minutes>(requestUrl)
    .then((response) => {
      getLogger.info('data obtained from upstream');

      const domainsOvertime = Object.entries(response.data.domains_over_time);
      const adsOvertime = Object.entries(response.data.ads_over_time);

      // add blocked  datasets group
      responseData.datasets.push({
        data: [],
        backgroundColor: '#f56954',
        label: 'Blocked DNS Queries',
      });
      // add permitted  datasets group
      responseData.datasets.push({
        data: [],
        backgroundColor: '#00a65a',
        label: 'Permitted DNS Queries',
      });

      for (let i = 0; i < domainsOvertime.length; i += 1) {
        const time = +domainsOvertime[i][0]; // convert domainOvertime to type `number`
        const blocked = adsOvertime[i][1];
        const allowed = domainsOvertime[i][1] - adsOvertime[i][1];
        const hour = // set date/time in UNIX format
          time < 1200
            ? new Date().setHours(Math.floor(time / 6), 10 * (time % 6), 0, 0)
            : new Date(1000 * time).getTime();

        responseData.labels?.push(hour);
        responseData.datasets[0].data.push(blocked);
        responseData.datasets[1].data.push(allowed);
      }

      res.status(200).json(responseData);
      getLogger.complete(`sending response`);
      getLogger.debug('response data: ', responseData);
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
      const { formatted = 'false' } = req.query as IGetRequestData;

      if (formatted === 'true') {
        handleGetQueriesOvertimeFormatted(req, res);
      } else {
        handleGetQueriesOvertimeRaw(req, res);
      }
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
