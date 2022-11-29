// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError, AxiosResponse } from 'axios';
import crypto from 'crypto';
import { Address4 } from 'ip-address';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ErrorResponse, InternalServerError, UnreachableResponse } from '@lib/AxiosError';
import { IAuthSession, withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';
import { postAuthSessionUrl as apiUrl } from '@utils/url/api';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * Data sent by the user.
 */
export type PostRequestData = IAuthSession;

/**
 * Data sent as a Response
 */
export interface PostResponseData {
  /**
   * Message sent to the requester.
   * Could be a success message.
   * Could be a error message.
   */
  message: string;
}

// throw different types of errors, depending on the situation
// obtained from
//    https://rapidapi.com/guides/handle-axios-errors
//    https://medium.com/geekculture/how-to-strongly-type-try-catch-blocks-in-typescript-4681aff406b9
//    https://rapidapi.com/guides/handle-axios-errors
//    https://dev.to/charlintosh/setting-up-axios-interceptors-react-js-typescript-12k5
//    https://stackoverflow.com/a/73062433/3053548
//    https://dev.to/darkmavis1980/how-to-use-axios-interceptors-to-handle-api-error-responses-2ij1
axios.interceptors.response.use(
  // onFulfilled
  (response: AxiosResponse<PostRequestData>) => response,
  // onRejected
  (error: AxiosError<string, PostRequestData>) => {
    const unreachableMsg = 'Pi-hole not reachable. Try a different IP address or port';
    // const { code } = error;
    const status = error.response?.status ?? 500;
    const axiosErrorLogger = logger.scope(apiUrl, 'axios response', 'ERROR');

    // The request was made but no response was received
    if (error.request) {
      // logger.info(`error.request`, error.request);
      axiosErrorLogger.info({
        // prefix: 'axios.interceptors.response /api/auth/login',
        message: `returning error UnreachableResponse { message: '${unreachableMsg} status: ${
          status || 400
        }'}`,
      });
      return Promise.reject(new UnreachableResponse(unreachableMsg, status || 400));
    }
    // response was received, but has a status code in range of 500
    if (error.response) {
      axiosErrorLogger.info({
        // prefix: 'axios.interceptors.response /api/auth/login',
        message: `returning error InternalServerError { message: '${error.response.data}, status: ${
          status || 500
        }'}`,
      });
      return Promise.reject(new InternalServerError(error.response.data, status || 500));
    }

    // Something happened in setting up the request that triggered an error
    axiosErrorLogger.info({
      // prefix: 'axios.interceptors.response /api/auth/login',
      message: `returning error ErrorResponse { message: '${
        error.message || unreachableMsg
      }, status: ${status || 500}' }`,
    });
    return Promise.reject(new ErrorResponse(error.message || 'Error response', status || 500));
  },
);

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Login for user.
 *
 * check if IPv4 is valid
 * check if port number is valid
 * check if IPv4 and password works with Pi-hole api
 * if authentication failed, return response status 400
 * if authentication is successful, create session cookie (IP address and password) encrypted
 *
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handlePost = async (req: NextApiRequest, res: NextApiResponse<PostResponseData>) => {
  const { ipAddress, password, port } = req.body as PostRequestData;

  // check if password works with the api
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  logger.addSecrets([password, hash]);

  const postLogger = logger.scope(apiUrl, 'POST');

  // validate serverIp
  if (!Address4.isValid(ipAddress)) {
    postLogger.error(`invalid IP address`);
    postLogger.complete(`sending response 'invalid IP address. ${ipAddress}'`);
    res.status(400).json({ message: 'invalid IP address' });
    return;
  }

  // validate port number
  if (port === '' || !Number.isInteger(+port)) {
    postLogger.error(`invalid port number`);
    postLogger.complete(`sending response 'invalid port number. '${port}'`);
    res.status(400).json({ message: `invalid port number. '${port}'` });
    return;
  }

  // check if credentials work
  // if it works, data should be returned
  // if it doesn't work, empty array is returned
  await axios
    .get(`http://${ipAddress}:${port}/admin/api_db.php`, {
      params: {
        status: true,
        auth: hash,
      },
      timeout: 1000, // the request shouldn't take longer than 1 seconds
    })
    .then(async (response: AxiosResponse<PostResponseData>) => {
      // if user provided invalid credentials
      if (Array.isArray(response.data)) {
        postLogger.error(`invalid credentials`);
        postLogger.complete(`sending response 'invalid credentials'`);
        // console.log(`sending to user: 'invalid credentials'`);
        res.status(400).json({ message: 'invalid credentials' });
        return;
      }

      postLogger.info(`saving credentials as encrypted cookie`);
      // create encrypted cookie session to store ipAddress, port and password. Check iron-session
      // obtained from https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/pages/api/login.ts
      req.session.authSession = {
        ipAddress,
        port,
        password: hash,
      };
      await req.session.save();

      // user is authenticated
      postLogger.complete(`sending response`, { message: 'success' });
      res.status(200).json({
        message: 'success',
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      postLogger.error(
        `error returned when sending HTTP request to 'http://${ipAddress}:${port}/admin/api_db.php'`,
      );
      postLogger.info(`upstream response message: '${error.message}'`);
      postLogger.complete(
        `sending response: { message: '${error.message}', status: ${error.status ?? 500} }`,
      );

      res.status(error.status ? Number(error.status) : 500).json({ message: error.message });
    });
};

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Default method to run when executing this http api endpoint
 *
 * @remarks
 * HTTP API endpoint `/api/auth/login`
 *
 * @remarks
 * HTTP method allowed: `POST`
 */
const requestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'POST': {
      await handlePost(req, res);
      break;
    }
    default: {
      logger.error({ prefix: apiUrl, message: `invalid HTTP method type '${method}'` });
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withSessionRoute(requestHandler);
