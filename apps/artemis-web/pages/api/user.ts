import nextConnect from 'next-connect';
import auth from '../../middleware/auth';
import { extractUser } from '../../lib/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();

handler.use(auth);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ user: extractUser(req) });
});

export default handler;