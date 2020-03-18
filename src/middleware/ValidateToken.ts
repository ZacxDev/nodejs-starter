import { NextFunction, Response, Request } from 'express';

export const ValidateToken = (req: Request, res: Response, next: NextFunction): void|Response => {
  const secret = req.query.secret;
  if (secret === process.env.SECRET) {
    return next();
  } else {
    return res.status(401).send('Unauthorized');
  }
};
