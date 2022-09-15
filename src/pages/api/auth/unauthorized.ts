import type { NextApiRequest, NextApiResponse } from 'next';

import logger from '@utils/logger';

const unauthorizedLogger = logger.scope('/api/auth/unauthorized');

interface ResponseBody {
  message: string;
}

/**
 * Endpoint `/api/auth/unauthorized`
 *
 * To be used when attempting to access endpoint that requires Authentication
 *
 * @param req - NextApiRequest
 * @param res - NextApiResponse. Used for sending a response back
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
  unauthorizedLogger.error('Authorization required');
  unauthorizedLogger.complete('aborting');
  res.status(401).json({ message: 'Authorizaton required' });
}
