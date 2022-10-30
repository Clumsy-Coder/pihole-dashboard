import axios from 'axios';
import { ChartData } from 'chart.js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import { chartThemeColours } from '@utils/darkTheme';
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

export interface IGetRequestData {
  /**
   * Return formatted data that is compatible with ChartJS
   *
   * @see {@link https://www.chartjs.org/docs/latest/general/data-structures.html}
   * @see {@link https://www.chartjs.org/docs/latest/charts/bar.html#example-dataset-configuration}
   *
   * @defaultValue `false`
   */
  formatted?: string | 'false';
}

/**
 * `overtimeDataClients` and `getClientNames` data format obtained from Pi-hole
 */
export type IGetClientsOvertimeResponseData = IClientNames & IClientsOvertime;

export type IGetClientsOvertimeFormatted = ChartData<'bar', number[], number>;

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
 * GET endpoint for `/api/queries/clients/overtime`
 *
 * returns formatted data for ChartJS and react-chartjs-2
 *
 * @see {@link https://github.com/pi-hole/AdminLTE/blob/master/scripts/pi-hole/js/index.js#L330-L417 | Code inspired by Pi-hole Admin portal}
 *
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleGetClientsOvertimeFormatted = (
  req: NextApiRequest,
  res: NextApiResponse<IGetClientsOvertimeFormatted | ErrorMessage>,
) => {
  const getLogger = logger.scope(apiUrl, 'GET');
  const { ipAddress, port, password } = req.session.authSession;

  const requestUrl = `http://${ipAddress}:${port}/${clientOvertimeAndNamesUrl()}&auth=${password}`;
  const responseData: IGetClientsOvertimeFormatted = {
    labels: [], // unix time
    datasets: [],
  };

  axios
    .get<IGetClientsOvertimeResponseData>(requestUrl)
    .then((response) => {
      getLogger.info('data obtained from upstream');

      const timestamps = Object.keys(response.data.over_time);
      const plotData = Object.values(response.data.over_time);
      const labels: string[] = [];

      // add client names as labels
      response.data.clients.forEach((client) => {
        const clientName = client.name.length > 0 ? client.name : client.ip;
        labels.push(clientName);
      });

      for (let i = 0; i < plotData[0].length; i += 1) {
        responseData.datasets.push({
          data: [],
          // If we ran out of colors, make a random one
          backgroundColor:
            i < chartThemeColours.length
              ? chartThemeColours[i]
              : `#${(0x1000000 + Math.random() * 0xffffff).toString(16).slice(0, 6)}`,
          label: labels[i],
        });
      }

      // Add data for each dataset that is available
      timestamps.forEach((e, j) => {
        plotData[j].forEach((element, key) => {
          responseData.datasets[key].data.push(element);
        });

        const date = new Date(1000 * parseInt(timestamps[j], 10));
        responseData.labels?.push(date.getTime());
      });

      res.status(200).json(responseData);
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
      const { formatted = 'false' } = req.query as IGetRequestData;

      if (formatted === 'true') {
        handleGetClientsOvertimeFormatted(req, res);
      } else {
        handleGetClientsOvertimeRaw(req, res);
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
