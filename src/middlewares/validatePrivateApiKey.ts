import { Request, Response, NextFunction } from 'express';

export const validatePrivateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerApiKey = req.headers['api-key'];
  const serverApiKey = process.env.PRIVATE_API_KEY;

  if (headerApiKey === serverApiKey) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
