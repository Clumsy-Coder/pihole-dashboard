import { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@lib/AuthSession';
import logger from '@utils/logger';

/**
 * Data sent as a Response
 */
export interface DeleteResponseData {
  /**
   * Message sent to the requester.
   * Could be a success message.
   */
  message: string;
}

/**
 * Remove Session cookie used for Pi-hole authentication
 *
 * @param req - HTTP request provided by NextJS
 * @param res - HTTP response provided by NextJS
 */
const handleDelete = (req: NextApiRequest, res: NextApiResponse<DeleteResponseData>) => {
  const deleteLogger = logger.scope('/api/auth/logout', 'DELETE');

  deleteLogger.info('removing Session cookie');
  req.session.destroy();
  deleteLogger.success('Session cookie removed');

  const responseMessage: DeleteResponseData = {
    message: 'success',
  };
  deleteLogger.complete(`Returning response: ${JSON.stringify(responseMessage)}`);
  res.status(200).json(responseMessage);
};

/**
 * Default method to run when executing this http api endpoint
 *
 * @remarks
 * HTTP API endpoint `/api/auth/logout`
 *
 * @remarks
 * HTTP method allowed: `DELETE`
 */
const mainHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method = '' } = req;

  // limit which HTTP methods are allowed
  switch (method) {
    case 'DELETE': {
      handleDelete(req, res);
      break;
    }
    default: {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withSessionRoute(mainHandler);
