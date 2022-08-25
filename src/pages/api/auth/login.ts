// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Address4 } from 'ip-address';
import crypto from 'crypto';
import axios from 'axios';

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
}

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
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ipAddress: serverIp, password } = req.body as PostRequestData;

  // validate serverIp
  if (!Address4.isValid(serverIp)) {
    res.status(400).json({ message: 'invalid IP address' });
    return;
  }
  // check if password works with the api
  const hash = crypto.createHash('sha256').update(password).digest('hex');

  // check if credentials work
  // if it works, data should be returned
  // if it doesn't work, empty array is returned
  const result = await axios.get(`http://${serverIp}/admin/api_db.php`, {
    params: {
      status: true,
      auth: hash,
    },
  });

  // if user provided invalid credentials
  if (Array.isArray(result.data)) {
    res.status(400).json({ message: 'invalid credentials' });
    return;
  }

  // TODO: create encrypted cookie session to store ipAddress and password. Check iron-session

  // user is authenticated
  res.status(200).json({
    message: 'logged in',
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
