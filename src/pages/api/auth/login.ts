// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Address4 } from 'ip-address';
import crypto from 'crypto';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse, InternalServerError, UnreachableResponse } from '@lib/AxiosError';

/**
 * Data sent by the user.
 */
export interface PostRequestData {
  /**
   * Pi-hole IPv4 address
   */
  ipAddress: string;
  /**
   * Pi-hole authentication password.
   * Stored as a sha256 hash
   */
  password: string;
  /**
   * Pi-hole port number
   * Default is 80
   */
  port: string | 80;
}

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
//    https://medium.com/geekculture/how-to-strongly-type-try-catch-blocks-in-typescript-4681aff406b9
axios.interceptors.response.use(
  // onFulfilled
  (response: AxiosResponse<PostRequestData>) => response,
  // onRejected
  (response: AxiosResponse<string, PostRequestData>) => {
    // The request was made but no response was received
    if (response.request) {
      return Promise.reject(
        new UnreachableResponse(
          response.data || 'Pi-hole not reachable. Try a different IP address or port',
          response.status || 400,
        ),
      );
    }
    if (response.status >= 500) {
      return Promise.reject(new InternalServerError(response.data, response.status || 500));
    }

    // Something happened in setting up the request that triggered an error
    return new ErrorResponse(response.data, response.status || 500);
  },
);

// ////////////////////////////////////////////////////////////////////////////////////////////// //

/**
 * Login for user.
 *
 * check if IPv4 is valid
 * check if IPv4 and password works with Pi-hole api
 * if authentication failed, return response status 400
 * if authentication is successful, create session cookie (IP address and password) encrypted
 *
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 * @returns undefined
 */
const handlePost = async (req: NextApiRequest, res: NextApiResponse<PostResponseData>) => {
  const { ipAddress: serverIp, password, port } = req.body as PostRequestData;

  // validate serverIp
  if (!Address4.isValid(serverIp)) {
    res.status(400).json({ message: 'invalid IP address' });
    return;
  }

  // validate port number
  if (port === '' || !Number.isInteger(+port)) {
    res.status(400).json({ message: `invalid port number. '${port}'` });
    return;
  }

  // check if password works with the api
  const hash = crypto.createHash('sha256').update(password).digest('hex');

  // check if credentials work
  // if it works, data should be returned
  // if it doesn't work, empty array is returned
  await axios
    .get(`http://${serverIp}:${port}/admin/api_db.php`, {
      params: {
        status: true,
        auth: hash,
      },
      timeout: 10000, // the request shouldn't take longer than 1 seconds
    })
    .then((response: AxiosResponse<PostResponseData>) => {
      // if user provided invalid credentials
      if (Array.isArray(response.data)) {
        res.status(400).json({ message: 'invalid credentials' });
        return;
      }

      // user is authenticated
      res.status(200).json({
        message: 'logged in',
      });
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      res.status(error.status ? Number(error.status) : 500).json({ message: error.message });
    });
  // TODO: create encrypted cookie session to store ipAddress and password. Check iron-session
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
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'POST': {
      await handlePost(req, res);
      break;
    }
    default: {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};
