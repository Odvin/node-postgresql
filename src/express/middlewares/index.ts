import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

// Signed request header has to contain
// -- Authorization: Bearer UserToken --

export async function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // const { authorization = 'Is empty' } = req.headers;
    // const [, token] = authorization.split(' ');

    // const tokenPayload = await validateToken(token);

    res.locals.userId = 'userUUID';

    return next();
  } catch (e) {
    res.set('WWW-Authenticate', 'Bearer');
    return next(createError(401, 'Authentication required.'));
  }
}
